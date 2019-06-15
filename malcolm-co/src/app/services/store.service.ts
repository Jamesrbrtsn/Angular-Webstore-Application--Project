import { Injectable } from '@angular/core';


import { StoreItem } from '../classes/storeItem';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  credentials: 'same-origin', // include, *same-origin, omit for cors
  headers: new HttpHeaders({ 
    'Content-Type': 'applciation/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private http: HttpClient
  ) { }

  private host = 'localhost';
  private apiPort = 3000;

  private apiHostUrl = `http://${this.host}:${this.apiPort}/api`;
  private itemsUrl = '/items';
  private avaliableAndQuantity = '/quantity/avaliable';
  private storeItemsUrl = this.apiHostUrl + this.itemsUrl;
  private storeFrontUrl = this.apiHostUrl + this.itemsUrl + this.avaliableAndQuantity;

  /** GET items from the server */  // only avaliable and with quantity
  getItems(): Observable<StoreItem[]> {
    return this.http.get<StoreItem[]>(this.storeFrontUrl)
      .pipe(
        tap(_ => this.log('items')),
        catchError(this.handleError<StoreItem[]>('getItems', []))
      );
    console.log('getItems attempted');
  }

  getItemNo404<Data>(id: number): Observable<StoreItem> {
    const url = `${this.storeItemsUrl}/?id=${id}`;
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
    const url = `${this.storeItemsUrl}/${id}`;
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
    /*
    return this.http.get<StoreItem[]>(`${this.storeItemsUrl}/${term}`);
    fetchh('http://example.com/movies.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
      });
    */
    return this.http.get<StoreItem[]>(`${this.storeItemsUrl}/?${term}`).pipe(
      tap(_ => this.log(`found items matching "${term}"`)),
      catchError(this.handleError<StoreItem[]>('searchItems', []))
    );
    //
  }

  // addItem(obj)
  // deleteItem(obj | id)
  // updateItem

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
