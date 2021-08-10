import { Pokemon } from './../../models/pokemon';
import { PokemonService } from './../../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  addPokemon(form: NgForm) {
    const pokemon: Pokemon = form.value;
    console.log('PokeListComponent.addPokemon():');
    console.log(pokemon);
    if (!form.valid) {
      console.error('PokeListComponent.addPokemon(): invalid form');
      console.error(form);
      return;
    }
    this.pokeService.create(pokemon).subscribe(
      data => {
        this.loadPokemon();
        this.selected = null;
      },
      err => {
        console.error('PokeListComponent.addPokemon(): Error adding pokemon');
        console.error(pokemon);
        console.error(err);
      }
    );
  }

}
