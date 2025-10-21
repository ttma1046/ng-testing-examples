// #docregion
import { Component, inject, signal, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Observable, of } from 'rxjs';
import { catchError, startWith } from 'rxjs/operators';

import { TwainService } from '../../core/services/twain.service';

@Component({
  selector: 'twain-quote',
  templateUrl: './twain.html',
  styleUrls: ['./twain.scss'],
  imports: [AsyncPipe],
})
export class Twain implements OnInit {
  errorMessage = signal('');
  quote?: Observable<string>;

  private twainService = inject(TwainService);

  ngOnInit() {
    this.getQuote();
  }

  getQuote() {
    this.errorMessage.set('');
    this.quote = this.twainService.getQuote().pipe(
      startWith('...'),
      catchError((err: any) => {
        this.errorMessage.set(err.message || err.toString());
        return of('...'); // reset message to placeholder
      })
    );
  }
}
