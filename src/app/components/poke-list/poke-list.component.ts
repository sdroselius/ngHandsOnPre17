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
  editPokemon: Pokemon | null = null;
  types = [
    'all',
    'normal',
    'poison',
    'water',
    'fighting',
    'fire',
    'bug',
    'flying',
    'electric',
    'ground',
    'rock',
    'psychic',
    'ghost',
    'dragon'
  ];
  selectedType: string = 'all';

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

  setEditPokemon(pokemon: Pokemon) {
    this.editPokemon = Object.assign({}, pokemon);
  }

  updatePokemon(pokemon: Pokemon) {
    console.log('Updating pokemon:');
    console.log(pokemon);
    this.pokeService.update(pokemon).subscribe(
      good => {
        const poke: Pokemon = good;
        this.selected = poke;
        this.editPokemon = null;
      },
      bad => {
        console.error('PokeListComponent.updatePokemon(): Error updating pokemon');
        console.error(bad);
      }
    );
  }

  deletePokemon(id: number) {
    this.pokeService.destroy(id).subscribe(
      good => {
        console.log('Pokemon deleted: ' + id);
        this.loadPokemon();
        this.selected = null;
      },
      bad => {
        console.error('PokeListComponent.destroy(): Error deleting pokemon ID ' + id);
        console.error(bad);
      }
    );
  }


}
