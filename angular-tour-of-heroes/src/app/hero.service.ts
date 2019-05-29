import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'applciation/json' })
};


@Injectable({
  providedIn: 'root'
})
// controls the data. Can access web servicaes or storage
export class HeroService {

  // service in a service - inject messageService into HeroService
  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  private heroesUrl = 'api/heroes'; //URL to web api

  private log(message: string) {
    this.messageService.add(`HeroService:${message}`);
  }

  /*changed for asycnh  --- synch
  getHeroes(): Hero[] {
    return HEROES;
  }*/
  // asynch
  getHeroes(): Observable<Hero[]> {
    // add message
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log(' fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message after fetching the hero
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(` fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }


  /* *PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
