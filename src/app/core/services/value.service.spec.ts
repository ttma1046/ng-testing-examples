import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { ValueService } from './value.service';

export class NotProvided extends ValueService {
  /* example below */
}

describe('demo (no TestBed):', () => {
  describe('ValueService', () => {
    let service: ValueService;
    beforeEach(() => {
      service = new ValueService();
    });

    it('#getValue should return real value', () => {
      expect(service.getValue()).toBe('real value');
    });

    it('#getObservableValue should return value from observable', (done: DoneFn) => {
      service.getObservableValue().subscribe((value) => {
        expect(value).toBe('observable value');
        done();
      });
    });

    it('#getPromiseValue should return value from a promise', (done: DoneFn) => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe('promise value');
        done();
      });
    });

    it('#getPromiseValue should return value from a promise', waitForAsync(() => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe('promise value');
      });
    }));

    it('#getObservableValue should return value from observable', waitForAsync(() => {
      service.getObservableValue().subscribe((value) => {
        expect(value).toBe('observable value');
      });
    }));
  });
});

describe('demo (with TestBed):', () => {
  ////////  Service Tests  /////////////

  describe('ValueService', () => {
    // #docregion value-service-before-each
    let service: ValueService;

    // #docregion value-service-inject-before-each
    beforeEach(() => {
      TestBed.configureTestingModule({ providers: [ValueService] });
      // #enddocregion value-service-before-each
      service = TestBed.inject(ValueService);
      // #docregion value-service-before-each
    });
    // #enddocregion value-service-before-each, value-service-inject-before-each

    // #docregion value-service-inject-it
    it('should use ValueService', () => {
      expect(service.getValue()).toBe('real value');
    });
    // #enddocregion value-service-inject-it

    it('can inject a default value when service is not provided', () => {
      // #docregion testbed-get-w-null
      expect(TestBed.inject(NotProvided, null)).toBeNull();
      // #enddocregion testbed-get-w-null
    });

    it('test should wait for ValueService.getPromiseValue', waitForAsync(() => {
      service.getPromiseValue().then((value: string) => expect(value).toBe('promise value'));
    }));

    it('test should wait for ValueService.getObservableValue', waitForAsync(() => {
      service
        .getObservableValue()
        .subscribe((value: string) => expect(value).toBe('observable value'));
    }));

    // Must use done. See https://github.com/angular/angular/issues/10127
    it('test should wait for ValueService.getObservableDelayValue', (done: DoneFn) => {
      service.getObservableDelayValue().subscribe((value: string) => {
        expect(value).toBe('observable delay value');
        done();
      });
    });

    it('should allow the use of fakeAsync', fakeAsync(() => {
      service.getPromiseValue().then((val: string) => {
        expect(val).toBe('promise value');
      });
      tick(); // Trigger JS engine cycle until all promises resolve.
    }));
  });
});
