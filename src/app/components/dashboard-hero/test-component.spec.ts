import { ComponentFixture, TestBed } from '@angular/core/testing';
import { appProviders } from 'src/app/app.config';
import { click } from 'src/testing';

import { TestHostComponent } from './test-component';

describe('DashboardHeroComponent when inside a test host', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let heroEl: HTMLElement;

  beforeEach(() => {
    // #docregion test-host-setup
    TestBed.configureTestingModule({
      providers: appProviders,
    });
  });

  beforeEach(() => {
    // #docregion test-host-setup
    // create TestHostComponent instead of DashboardHeroComponent
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    heroEl = fixture.nativeElement.querySelector('.hero');
    fixture.detectChanges(); // trigger initial data binding
    // #enddocregion test-host-setup
  });

  // #docregion test-host-tests
  it('should display hero name', () => {
    const expectedPipedName = testHost.hero.name.toUpperCase();
    expect(heroEl.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked', () => {
    click(heroEl);
    // selected hero should be the same data bound hero
    expect(testHost.selectedHero).toBe(testHost.hero);
  });
});
