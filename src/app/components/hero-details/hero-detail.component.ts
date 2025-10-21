// #docplaster
import { Component } from '@angular/core';
import { Hero } from '@core/models';
import { FormsModule } from '@shared/shared';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  imports: [FormsModule],
})
export class HeroDetailComponent {
  hero: Hero = { id: 1, name: '' };

  save(): void {
    console.log('saved');
  }

  cancel() {
    this.gotoList();
  }

  gotoList() {
    console.log('saved');
  }
}
