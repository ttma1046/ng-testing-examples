import { TestBed } from '@angular/core/testing';

import { TwainService } from './twain.service';

describe('Twain', () => {
  let service: TwainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
