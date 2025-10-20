import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let h1: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerComponent],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector('h1');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display original title', () => {
    expect(h1.textContent).toContain(component.title());
  });

  it('should still see original title after comp.title change', async () => {
    const oldTitle = component.title();
    const newTitle = 'Test Title';
    component.title.set(newTitle);
    // Displayed title is old because Angular didn't yet run change detection
    expect(h1.textContent).toContain(oldTitle);
    await fixture.whenStable();
    expect(h1.textContent).toContain(newTitle);
  });

  it('should display a different test title', () => {
    component.title.set('Test Title');
    fixture.detectChanges();
    expect(h1.textContent).toContain(component.title());
  });
});
