import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://api.skilldistillery.com:8080/';
  private url = this.baseUrl + 'poke/data/poke';

  index(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.url + '?sorted=true').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('PokemonService.index(): error retrieving pokemon: ' + err);
      })
    );
  }

}
