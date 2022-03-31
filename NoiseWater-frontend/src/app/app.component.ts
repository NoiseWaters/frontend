import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean = false;
  username: string = '';
  updateUserData(username: string): void {
    this.username = username;
  }

  signOut(): void {

    window.location.reload();
    // reloading the window clears the session storage and log out the user

  }
}