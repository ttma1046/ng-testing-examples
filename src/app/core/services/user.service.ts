import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = signal({ name: 'Test User' });
  isLoggedIn = signal(true);
}
