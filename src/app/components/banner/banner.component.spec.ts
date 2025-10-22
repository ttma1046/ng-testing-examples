import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let h1: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector('h1');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display original title', () => {
    expect(h1.textContent).toEqual('');
  });

  it('should display original title', () => {
    fixture.detectChanges();
    expect(h1.textContent).toContain(component.title());
  });

  it('should display a different test title', () => {
    component.title.set('Test Title');
    fixture.detectChanges();
    expect(h1.textContent).toContain(component.title());
  });

  it('should still see original title after comp.title change', async () => {
    const oldTitle = component.title();
    fixture.detectChanges();
    expect(h1.textContent).toContain(oldTitle);

    const newTitle = 'Test Title';
    component.title.set(newTitle);
    fixture.detectChanges();
    expect(h1.textContent).toContain(newTitle);
  });

  it('should still see original title after comp.title change', async () => {
    fixture.detectChanges();

    const oldTitle = component.title();
    const newTitle = 'Test Title';
    component.title.set(newTitle);

    expect(h1.textContent).toContain(oldTitle);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(h1.textContent).toContain(newTitle);
  });
});
