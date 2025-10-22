import { Component } from '@angular/core';
import { HighlightDirective } from '@shared/shared';

@Component({
  selector: 'app-about',
  imports: [HighlightDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}
