import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-welcome',
  template: '<h3 class="welcome"><i>{{welcome()}}</i></h3>',
})
export class WelcomeComponent implements OnInit {
  welcome = signal('');
  private userService = inject(UserService);

  ngOnInit() {
    this.welcome.set(
      this.userService.isLoggedIn() ? 'Welcome, ' + this.userService.user().name : 'Please log in.'
    );
  }
}
