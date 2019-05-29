import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
// import {HEROES} from '../mock-heroes'; traded for below
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  /*hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };*/
  // selectedHero: Hero; //dead
  /*Dead
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }*/
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }
  /*Synch
  getHeroes(): void {
    this.heroes = this.heroService.getHeroes(); //will need to be asyncronhous in real app for response delays
  }*/
  // Asynch
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
