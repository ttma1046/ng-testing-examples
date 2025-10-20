// #docplaster
import { Component } from '@angular/core';

import { Hero } from '@core/models';
import { TitleCasePipe, FormsModule } from '@shared/shared';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  imports: [FormsModule],
})
export class HeroDetailComponent {
  hero: Hero = { id: 1, name: '' };

  save(): void {}

  cancel() {
    this.gotoList();
  }

  gotoList() {}
}
