import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';


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
    // add message
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message after fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

}
