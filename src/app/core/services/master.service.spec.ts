import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueService } from './value.service';

export class FakeValueService extends ValueService {
  override value = 'faked service value';
}

describe('Master', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);
    TestBed.configureTestingModule({
      // Provide both the service-to-test and its (spy) dependency
      providers: [MasterService, { provide: ValueService, useValue: spy }],
    });
    // Inject both the service-to-test and its (spy) dependency
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('should be created', () => {
    expect(valueServiceSpy).toBeTruthy();
  });

  it('#getValue next', () => {
    const stubValue = 'stub value';
    valueServiceSpy.getValue.and.returnValue(stubValue);

    expect(masterService.getValue()).withContext('service returned stub value').toBe(stubValue);
    expect(valueServiceSpy.getValue.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
    expect(valueServiceSpy.getValue.calls.mostRecent().returnValue).toBe(stubValue);
  });

  it('#getValue should return stubbed value from a spy', () => {
    const stubValue = 'stub value';
    valueServiceSpy.getValue.and.returnValue(stubValue);

    expect(masterService.getValue()).withContext('service returned stub value').toBe(stubValue);
    expect(valueServiceSpy.getValue.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
    expect(valueServiceSpy.getValue.calls.mostRecent().returnValue).toBe(stubValue);
  });
});

/*
describe('MasterService without Angular testing support', () => {
  let masterService: MasterService;
  it('#getValue should return real value from the real service', () => {
    masterService = new MasterService(new ValueService());
    expect(masterService.getValue()).toBe('real value');
  });
  it('#getValue should return faked value from a fakeService', () => {
    masterService = new MasterService(new FakeValueService());
    expect(masterService.getValue()).toBe('faked service value');
  });
  it('#getValue should return faked value from a fake object', () => {
    const fake = { getValue: () => 'fake value' };
    masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('fake value');
  });
  it('#getValue should return stubbed value from a spy', () => {
    // create `getValue` spy on an object representing the ValueService
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    // set the value to return when the `getValue` spy is called.
    const stubValue = 'stub value';
    valueServiceSpy.getValue.and.returnValue(stubValue);
    masterService = new MasterService(valueServiceSpy);
    expect(masterService.getValue()).withContext('service returned stub value').toBe(stubValue);
    expect(valueServiceSpy.getValue.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
    expect(valueServiceSpy.getValue.calls.mostRecent().returnValue).toBe(stubValue);
  });
});
*/
