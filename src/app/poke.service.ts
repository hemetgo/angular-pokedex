import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from './models/pokemon';
import { PokemonSpecie } from './models/pokemon-specie';

@Injectable({
  providedIn: 'root'
})
export class PokeService {

  private baseUrl = 'https://pokeapi.co/api/v2/';
  private speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/';

  pokemonList: Pokemon[] = new Array();;

  constructor(private http: HttpClient) {}

  getAllPokemon(): Observable<Pokemon[]> {
    const url = `${this.baseUrl}pokemon?limit=9999`;
    return this.http.get<any>(url).pipe(
      map(response => response.results)
    );
  }

  getPokemonDetails(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }

  getSpecie(id: number): Observable<PokemonSpecie> {
    return this.http.get<PokemonSpecie>(`${this.speciesUrl}${id}`);
  }
}
