import { Component, OnInit } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import {User} from 'src/app/model/user';
import { UserService } from 'src/app/service/user-service.service';
import { ClientMessage } from './../../model/client-message';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public user = new User(0, '', '', '', []);
  public clientMessage = new ClientMessage('');
  password2: string = '';
  

  
  constructor(private userService : UserService, private router : Router) { }
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
    } else if (!this.user.email.includes("@") && !this.user.email.includes(".com") && !this.user.email.includes(".net") && !this.user.email.includes(".org") && !this.user.email.includes(".edu")){
      swal.fire({
        icon: 'error',
        title: 'Grrr...',
        text: 'You must enter a valid email!',
      })
    } 
    else{
      console.log('hello')
      this.userService.registerUser(this.user)
      .subscribe(
        data => {
          this.clientMessage.message = `Successfully registered ${data.username}`;
          swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your account has been created! Login to view your profile!',
          })
          this.router.navigateByUrl('/login-page');
        },
        error => {
          this.clientMessage.message = `Something went wrong. Error ${error}`
          swal.fire({
            icon: 'error',
            title: 'Whoopsie Daisies!',
            text: 'This username already exists!',
          })
        });
        this.user.username = '';
        this.user.password = '';
        this.user.email = '';
        this.user.password = '';
        this.password2 = '';
    }
    
  }
  ngOnInit(): void {
  }

}
