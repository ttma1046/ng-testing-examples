import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHero } from './dashboard-hero';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { appProviders } from 'src/app/app.config';
import { Hero } from '@core/models';
import { click } from 'src/testing';

describe('DashboardHero', () => {
  let component: DashboardHero;
  let fixture: ComponentFixture<DashboardHero>;

  let heroDe: DebugElement;
  let heroEl: HTMLElement;
  let expectedHero: Hero;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: appProviders,
    });
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(DashboardHero);
    component = fixture.componentInstance;

    // mock the hero supplied by the parent component
    expectedHero = { id: 42, name: 'Test Name' };
    // simulate the parent setting the input property with that hero
    fixture.componentRef.setInput('hero', expectedHero);

    // Now trigger change detection after the input is set
    fixture.autoDetectChanges();

    // find the hero's DebugElement and element
    heroDe = fixture.debugElement.query(By.css('.hero'));
    heroEl = heroDe.nativeElement;

    // wait for initial data binding
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hero name in uppercase', () => {
    const expectedPipedName = expectedHero.name.toUpperCase();
    expect(heroEl.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked (triggerEventHandler)', () => {
    let selectedHero: Hero | undefined;
    component.selected.subscribe((hero: Hero) => (selectedHero = hero));
    heroDe.triggerEventHandler('click');
    expect(selectedHero).toBe(expectedHero);
  });

  it('should raise selected event when clicked (triggerEventHandler)', () => {
    component.selected.subscribe((hero: Hero) => {
      expect(hero).toBe(expectedHero);
    });

    heroDe.triggerEventHandler('click');
  });

  it('should raise selected event when clicked (element.click)', () => {
    let selectedHero: Hero | undefined;
    component.selected.subscribe((hero: Hero) => (selectedHero = hero));
    heroEl.click();
    expect(selectedHero).toBe(expectedHero);
  });

  it('should raise selected event when clicked (triggerEventHandler)', () => {
    component.selected.subscribe((hero: Hero) => {
      expect(hero).toBe(expectedHero);
    });

    heroEl.click();
  });

  it('should raise selected event when clicked (click helper with DebugElement)', () => {
    let selectedHero: Hero | undefined;
    component.selected.subscribe((hero: Hero) => (selectedHero = hero));

    click(heroDe); // click helper with DebugElement

    expect(selectedHero).toBe(expectedHero);
  });

  it('should raise selected event when clicked (click helper with native element)', () => {
    let selectedHero: Hero | undefined;
    component.selected.subscribe((hero: Hero) => (selectedHero = hero));

    click(heroEl); // click helper with native element

    expect(selectedHero).toBe(expectedHero);
  });

  it('should raise selected event when clicked (triggerEventHandler)', () => {
    component.selected.subscribe((hero: Hero) => {
      expect(hero).toBe(expectedHero);
    });

    click(heroDe); // click helper with DebugElement
  });

  it('should raise selected event when clicked (triggerEventHandler)', () => {
    component.selected.subscribe((hero: Hero) => {
      expect(hero).toBe(expectedHero);
    });

    click(heroEl); // click helper with native element
  });
});
