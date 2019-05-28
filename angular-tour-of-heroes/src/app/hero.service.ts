import { Injectable } from '@angular/core';

import {Hero } from './hero';
import {HEROES} from './mock-heroes';

import { Observable, of } from 'rxjs';

import {MessageService} from './message.service';


@Injectable({
  providedIn: 'root'
})
// controls the data. Can access web servicaes or storage
export class HeroService {

  // service in a service - inject messageService into HeroService
  constructor(private messageService: MessageService) { }


  /*changed for asycnh  --- synch
  getHeroes(): Hero[] {
    return HEROES;
  }*/
  // asynch
  getHeroes(): Observable<Hero[]> {
    //add message
    this.messageService.add('HeroService: fetched heroes');

    return of (HEROES);
  }
}
