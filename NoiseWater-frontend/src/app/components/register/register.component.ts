import { Component, OnInit } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import {User} from 'src/app/model/user';
import { UserService } from 'src/app/service/user-service.service';
import { ClientMessage } from './../../model/client-message';
import swal from 'sweetalert2';

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
    
    if(!this.user.username || this.user.username.length < 3){
      swal.fire({
        icon: 'error',
        title: 'Grrr...',
        text: 'Your username must be longer than 3 characters!',
      })
    } else if(!this.user.email){
      swal.fire({
        icon: 'error',
        title: 'Grrr...',
        text: 'You must include an email!',
      })
    }else if(!this.user.password || this.user.password.length < 3 ){
      swal.fire({
        icon: 'error',
        title: 'Grrr...',
        text: 'Your password must be longer than 3 characters!',
      })
    }else if(!(this.user.password == (<HTMLInputElement>document.getElementById("psw-repeat")).value)){
      swal.fire({
        icon: 'error',
        title: 'Grrr...',
        text: 'Your passwords must match!',
      })
    } else{
      console.log('hello')
      this.userService.registerUser(this.user)
      .subscribe(
        data => this.clientMessage.message = `Successfully registered ${data.username}`,
        error => this.clientMessage.message = `Something went wrong. Error ${error}`);
    }
    
  }
  ngOnInit(): void {
  }

}
