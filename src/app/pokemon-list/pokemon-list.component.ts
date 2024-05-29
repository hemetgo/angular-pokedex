import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokeService } from '../poke.service';
import { Pokemon } from '../models/pokemon';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  constructor(private pokeService: PokeService) { }

  pokemonList: Pokemon[] = [];
  isLoading: boolean = true;

  @Input() filter: string = '';
  filteredPokemons: Pokemon[] = [];

  ngOnInit(): void {
    this.getPokemonList();
  }

  @Output() dataLoaded: EventEmitter<void> = new EventEmitter<void>();

  onSearch(event: any): void {
    this.filter = event.target.value.toLowerCase();
    this.applyFilter();
  }

  applyFilter(): void {
    this.filteredPokemons = this.pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().startsWith(this.filter)
    );
  }

  getPokemonList(): void {
    this.pokeService.getAllPokemon()
      .subscribe(pokemonBasicInfo => {
        const pokemonDetailsObservables = pokemonBasicInfo.map(pokemonInfo => 
          this.pokeService.getPokemonDetails(pokemonInfo.url)
        );

        forkJoin(pokemonDetailsObservables).subscribe(pokemonDetailsArray => {
          this.pokeService.pokemonList = pokemonDetailsArray;
          this.pokemonList = pokemonDetailsArray.filter(pokemon =>
            pokemon.sprites.front_default != null &&
            pokemon.sprites.front_default.length > 0 &&
            pokemon.id < 10000);
          this.filteredPokemons = this.pokemonList;
          this.applyFilter();
          this.dataLoaded.emit();
          this.isLoading = false;
        });
      });
  }

  onDataLoaded(): void {
    this.isLoading = false;
  }
}
