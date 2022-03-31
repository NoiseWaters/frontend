import { Component, OnInit } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import {User} from 'src/app/model/user';
import { UserService } from 'src/app/service/user-service.service';
import { ClientMessage } from './../../model/client-message';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public user = new User(0, '', '', '', []);
  public clientMessage = new ClientMessage('');
  
  constructor(private userService : UserService) { }
  public registerUser(): void {

    console.log(this.user);
    

    if(this.user.username && this.user.email && this.user.password && (this.user.password == (<HTMLInputElement>document.getElementById("psw-repeat")).value)){
      console.log('hello')
      this.userService.registerUser(this.user)
      .subscribe(
        data => this.clientMessage.message = `Successfully registered ${data.username}`,
        error => this.clientMessage.message = `Something went wrong. Error ${error}`);
    } 
    // send the user object to Spring Boot to persist in the db
    
  }
  ngOnInit(): void {
  }

}
