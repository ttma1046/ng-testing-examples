import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Twain } from './twain';
import { TwainService } from '@core/services/twain.service';
import { defer, of, throwError } from 'rxjs';
import { asyncData, asyncError } from 'src/testing';

describe('Twain', () => {
  let component: Twain;
  let fixture: ComponentFixture<Twain>;
  let getQuoteSpy: jasmine.Spy;
  let quoteEl: HTMLElement;
  let testQuote = '';

  const findErrorMessage = () => {
    const el = fixture.nativeElement.querySelector('.error');
    return el ? el.textContent : null;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TwainService],
    });
    testQuote = 'Test Quote';

    // Create a fake TwainService object with a `getQuote()` spy
    const twainService = TestBed.inject(TwainService);
    // Make the spy return a synchronous Observable with the test data
    getQuoteSpy = spyOn(twainService, 'getQuote').and.returnValue(of(testQuote));

    fixture = TestBed.createComponent(Twain);
    component = fixture.componentInstance;

    quoteEl = fixture.nativeElement.querySelector('.twain');
  });

  describe('when test with synchronous observable', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not show quote before OnInit', () => {
      expect(quoteEl.textContent).withContext('nothing displayed').toBe('');
      expect(findErrorMessage()).withContext('should not show error element').toBeNull();
      expect(getQuoteSpy.calls.any()).withContext('getQuote not yet called').toBe(false);
    });

    it('should show quote after component initialized', () => {
      fixture.detectChanges();

      // sync spy result shows testQuote immediately after init
      expect(quoteEl.textContent).toBe(testQuote);
      expect(getQuoteSpy.calls.any()).withContext('getQuote called').toBe(true);
    });

    it('should display error when TwainService fails', fakeAsync(() => {
      // tell spy to return an error observable after a timeout
      getQuoteSpy.and.returnValue(
        defer(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject('TwainService test failure');
            });
          });
        })
      );
      fixture.detectChanges(); // onInit()
      // sync spy errors immediately after init

      tick(); // flush the setTimeout()

      fixture.detectChanges(); // update errorMessage within setTimeout()

      expect(findErrorMessage())
        .withContext('should display error')
        .toMatch(/test failure/);
      expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
    }));
  });

  describe('when test with asynchronous observable', () => {
    beforeEach(() => {
      // #docregion async-setup
      // Simulate delayed observable values with the `asyncData()` helper
      getQuoteSpy.and.returnValue(asyncData(testQuote));
      // #enddocregion async-setup
    });

    it('should not show quote before OnInit', () => {
      expect(quoteEl.textContent).withContext('nothing displayed').toBe('');
      expect(findErrorMessage()).withContext('should not show error element').toBeNull();
      expect(getQuoteSpy.calls.any()).withContext('getQuote not yet called').toBe(false);
    });

    it('should still not show quote after component initialized', () => {
      fixture.detectChanges();
      // getQuote service is async => still has not returned with quote
      // so should show the start value, '...'
      expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
      expect(findErrorMessage()).withContext('should not show error').toBeNull();
      expect(getQuoteSpy.calls.any()).withContext('getQuote called').toBe(true);
    });

    // #docregion fake-async-test
    it('should show quote after getQuote (fakeAsync)', fakeAsync(() => {
      fixture.detectChanges(); // ngOnInit()
      expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');

      tick(); // flush the observable to get the quote
      fixture.detectChanges(); // update view

      expect(quoteEl.textContent).withContext('should show quote').toBe(testQuote);
      expect(findErrorMessage()).withContext('should not show error').toBeNull();
    }));
    // #enddocregion fake-async-test

    // #docregion async-test
    it('should show quote after getQuote (async)', async () => {
      fixture.detectChanges(); // ngOnInit()
      expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');

      await fixture.whenStable();
      // wait for async getQuote
      fixture.detectChanges(); // update view with quote
      expect(quoteEl.textContent).toBe(testQuote);
      expect(findErrorMessage()).withContext('should not show error').toBeNull();
    });
    // #enddocregion async-test

    it('should display error when TwainService fails', fakeAsync(() => {
      // tell spy to return an async error observable
      getQuoteSpy.and.returnValue(asyncError<string>('TwainService test failure'));

      fixture.detectChanges();
      tick(); // component shows error after a setTimeout()
      fixture.detectChanges(); // update error message

      expect(findErrorMessage())
        .withContext('should display error')
        .toMatch(/test failure/);
      expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
    }));
  });
});
