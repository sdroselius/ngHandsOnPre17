import { Pokemon } from './../models/pokemon';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokeType'
})
export class PokeTypePipe implements PipeTransform {

  transform(pokemons: Pokemon[], poketype: string): Pokemon[] {
    if (poketype === 'all') {
      return pokemons;
    }
    const filtered:Pokemon[] = [];
    for (const poke of pokemons) {
      for (const type of poke.types) {
        if (type.name === poketype) {
          filtered.push(poke);
          break;
        }
      }
    }
    return filtered;
  }

}
