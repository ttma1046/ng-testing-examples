import { inject, Injectable } from '@angular/core';
import { Hero } from '@core/models/hero';
import { HeroService } from '@core/services/hero.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HeroDetailService {
  private heroService = inject(HeroService);

  // Returns a clone which caller may modify safely
  getHero(id: number | string): Observable<Hero | null> {
    if (typeof id === 'string') {
      id = parseInt(id, 10);
    }
    return this.heroService.getHero(id).pipe(
      map((hero) => (hero ? Object.assign({}, hero) : null)) // clone or null
    );
  }

  saveHero(hero: Hero) {
    return this.heroService.updateHero(hero);
  }
}
