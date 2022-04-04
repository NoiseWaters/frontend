import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { Song } from 'src/app/model/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean = false;
  id: number = 0;
  username: string = '';
  password: string = '';
  email: string = '';
  songs: Song[] = [];
  updateUserData(user: User): void {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.songs = user.songs;
  }
}