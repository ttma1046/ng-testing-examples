import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TwainService {
  getQuote() {
    return of('3');
  }
}
