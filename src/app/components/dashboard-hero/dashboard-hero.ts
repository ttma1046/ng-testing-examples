import { UpperCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Hero } from '@core/models';

@Component({
  selector: 'dashboard-hero',
  imports: [UpperCasePipe],
  templateUrl: './dashboard-hero.html',
  styleUrl: './dashboard-hero.scss',
})
export class DashboardHero {
  readonly hero = input.required<Hero>();
  readonly selected = output<Hero>();

  click() {
    this.selected.emit(this.hero());
  }
}
