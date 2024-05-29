import { Injectable } from '@angular/core';
import { Pokemon } from './models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor() { }

  getBackground(pokemon : Pokemon): string {
    const types = pokemon.types.map((type: { type: { name: any; }; }) => type.type.name);
    if (types.length === 1) {
      return this.typeColors[types[0]];
    } else if (types.length === 2) {
      const color1 = this.typeColors[types[0]];
      const color2 = this.typeColors[types[1]];
      return `linear-gradient(-45deg, ${color2}, ${color1})`;
    }
    return 'white';
  }

  getTypeColors(): { [key: string]: string } {
    return this.typeColors;
  }

  typeColors: { [key: string]: string } = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
  };
}
