import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Hero } from '@core/models';
import { HeroService } from '@core/services';

@Component({
  selector: 'app-heroes',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css'],
  imports: [AsyncPipe],
})
export class HeroListComponent {
  heroes: Observable<Hero[]>;
  selectedHero!: Hero;

  constructor(private router: Router, private heroService: HeroService) {
    this.heroes = this.heroService.getHeroes();
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
    this.router.navigate(['../heroes', this.selectedHero.id]);
  }
}
