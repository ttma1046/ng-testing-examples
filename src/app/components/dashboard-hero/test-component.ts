import { Component } from '@angular/core';
import { Hero } from '@core/models';

import { DashboardHero } from './dashboard-hero';

@Component({
  imports: [DashboardHero],
  template: ` <app-dashboard-hero [hero]="hero" (selected)="onSelected($event)">
  </app-dashboard-hero>`,
})
export class TestHostComponent {
  hero: Hero = { id: 42, name: 'Test Name' };
  selectedHero: Hero | undefined;
  onSelected(hero: Hero) {
    this.selectedHero = hero;
  }
}
