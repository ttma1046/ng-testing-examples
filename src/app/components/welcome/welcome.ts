import { Component, computed, inject, signal } from '@angular/core';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-welcome',
  template: '<h3 class="welcome"><i>{{welcome()}}</i></h3>',
})
export class WelcomeComponent {
  private userService = inject(UserService);
  welcome = computed(() =>
    this.userService.isLoggedIn() ? 'Welcome, ' + this.userService.user().name : 'Please log in.'
  );
}
