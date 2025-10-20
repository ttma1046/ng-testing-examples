import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';

import { HeroDetailComponent } from './hero-detail.component';
import { DebugElement } from '@angular/core';

// let harness: RouterTestingHarness;

describe('BannerComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let h1: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the hero name ', async () => {
    // get the name's input and display elements from the DOM
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const nameInput: HTMLInputElement = bannerEl.querySelector('input')!;
    const nameDisplay: HTMLElement = bannerEl.querySelector('span')!;
    // simulate user entering a new name into the input box
    nameInput.value = 'quick BROWN  fOx';
    // Dispatch a DOM event so that Angular learns of input value change.
    nameInput.dispatchEvent(new Event('input'));
    // Wait for Angular to update the display binding through the title pipe
    await fixture.whenStable();
    expect(nameDisplay.textContent).toBe('');
  });
});
