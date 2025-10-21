import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome';
import { UserService } from '@core/services';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let userService: UserService;
  let componentUserService: UserService;
  let el: HTMLElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(WelcomeComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;

    // UserService actually injected into the component
    userService = fixture.debugElement.injector.get(UserService);
    componentUserService = userService;

    // UserService from the root injector
    userService = TestBed.inject(UserService);
    // get the "welcome" element by CSS selector (e.g., by class name)
    el = fixture.nativeElement.querySelector('.welcome');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should welcome the user', async () => {
    await fixture.whenStable();
    const content = el.textContent;
    expect(content).withContext('"Welcome ..."').toContain('Welcome');
    expect(content).withContext('expected name').toContain('Test User');
  });

  it('should welcome "Bubba"', async () => {
    userService.user.set({ name: 'Bubba' }); // welcome message hasn't been shown yet
    await fixture.whenStable();
    expect(el.textContent).toContain('Bubba');
  });

  it('should request login if not logged in', async () => {
    userService.isLoggedIn.set(false); // welcome message hasn't been shown yet
    await fixture.whenStable();
    const content = el.textContent;
    expect(content).withContext('not welcomed').not.toContain('Welcome');
    expect(content)
      .withContext('"log in"')
      .toMatch(/log in/i);
  });
});
