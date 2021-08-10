import { Pokemon } from './../../models/pokemon';
import { PokemonService } from './../../services/pokemon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokeListComponent implements OnInit {

  pokemons: Pokemon[] = [];
  selected: Pokemon | null = null;

  constructor(
    private pokeService: PokemonService
  ) { }

  ngOnInit(): void {
    this.loadPokemon();
  }

  loadPokemon(): void {
    this.pokeService.index().subscribe(
      pokemons => {
        this.pokemons = pokemons;
      },
      fail => {
        console.error('PokeListComponent.loadPokemon(): Error loading pokemon list');
        console.error(fail);
      }
    );
  }

}
