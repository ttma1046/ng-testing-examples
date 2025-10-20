import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-external-banner',
  templateUrl: './banner-external.component.html',
  styleUrls: ['./banner-external.component.css'],
})
export class BannerExternalComponent {
  title = signal('Test Tour of Heroes');
}
