import { Component, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokeService } from '../poke.service';
import { PokemonSpecie } from '../models/pokemon-specie';
import { Pokemon } from '../models/pokemon';
import { ColorsService } from '../colors.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css'
})
export class PokemonDetailsComponent {
  
  pokemon: Pokemon;
  typeColors: { [key: string]: string } = {};
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private colorService: ColorsService, private pokeService: PokeService) 
  {
    this.pokemon = data.pokemon;
    this.typeColors = this.colorService.getTypeColors();
  }

  specie: PokemonSpecie | undefined;
  
  ngOnInit(): void {
    this.updateSpecie();
  }

  haveNext(){
    return this.pokemon.id < this.pokeService.pokemonList.length;
  }

  havePrevious(){
    return this.pokemon.id > 1;
  }

  next() {
    const nextPokemon = this.pokeService.pokemonList.find(p => p.id === this.pokemon.id + 1);
    if (nextPokemon) {
      this.pokeService.getSpecie(nextPokemon.id).subscribe(specie => {
        this.pokemon = nextPokemon;
        this.specie = specie;
      });
    } else {
      console.error('Next Pokémon not found');
}
  }

  previous() {
    const nextPokemon = this.pokeService.pokemonList.find(p => p.id === this.pokemon.id - 1);
    if (nextPokemon) {
      this.pokeService.getSpecie(nextPokemon.id).subscribe(specie => {
        this.pokemon = nextPokemon;
        this.specie = specie;
      });
    } else {
      console.error('Previous Pokémon not found');
    }
  }

  updateSpecie() {
    this.pokeService.getSpecie(this.pokemon.id).subscribe(specie => {
      this.specie = specie;
    });
  }

  getBackground(){
    return this.colorService.getBackground(this.pokemon);
  }
}

