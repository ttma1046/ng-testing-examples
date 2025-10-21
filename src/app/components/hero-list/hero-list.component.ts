import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '@core/models';
import { HeroService } from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css'],
  imports: [AsyncPipe],
})
export class HeroListComponent {
  private router = inject(Router);
  private heroService = inject(HeroService);

  heroes: Observable<Hero[]>;
  selectedHero!: Hero;

  constructor() {
    this.heroes = this.heroService.getHeroes();
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
    this.router.navigate(['../heroes', this.selectedHero.id]);
  }
}
