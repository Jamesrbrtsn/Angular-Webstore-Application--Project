import { Injectable } from '@angular/core';


import { StoreItem } from '../classes/storeItem';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'applciation/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private http: HttpClient
  ) { }

  private storeItemsURL = 'api/shop';

  /** GET items from the server */
  getItems(): Observable<StoreItem[]> {
    return this.http.get<StoreItem[]>(this.storeItemsURL)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<StoreItem[]>('getItems', []))
      );
  }

  getItemNo404<Data>(id: number): Observable<StoreItem> {
    const url = `${this.storeItemsURL}/?id=${id}`;
    return this.http.get<StoreItem[]>(url)
      .pipe(
        map(items => items[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} item id=${id}`);
        }),
        catchError(this.handleError<StoreItem>(`getItem id=${id}`))
      );
  }

  // getItem(id: )
  /** GET item by id. Will 404 if id not found */
  getItem(id: number): Observable<StoreItem> {
    const url = `${this.storeItemsURL}/${id}`;
    return this.http.get<StoreItem>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<StoreItem>(`getItem id=${id}`))
    );
  }

  /* GET items whose name contains search term */
  searchItems(term: string): Observable<StoreItem[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<StoreItem[]>(`${this.storeItemsURL}/?name=${term}`).pipe(
      tap(_ => this.log(`found items matching "${term}"`)),
      catchError(this.handleError<StoreItem[]>('searchItems', []))
    );
  }

  //addItem(obj)
  //deleteItem(obj | id)
  //updateItem

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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

}
