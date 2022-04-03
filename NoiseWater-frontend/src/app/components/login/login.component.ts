import { AuthService } from '../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { User } from 'src/app/model/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  username: string = '';
  password: string = '';

  loginErrMsg: string = '';
  isLoading: boolean = false; // look into Angular Material for loading animations

  // we're injecting the AppComponent as a dependency so we can toggle its properties
  constructor(private authService: AuthService, private appComponent: AppComponent, private router: Router) { }

  // call on a service to take in the username and password and send
  // them to the /login endpoint of our server

  login() {
    
    // first check for empty value
    if (!this.username.trim() || !this.password.trim()) {
      
      this.loginErrMsg = 'Failed to Login';
      return;
    }
    // call the authService to hit the /login endpoint
    this.isLoading = true; // we'll change this back to false after the data is returned
    this.loginErrMsg = ''; // resets the error message to blank
    this.authService.login(this.username, this.password)
      .subscribe(
        (data) => { // returns the USER object that the login controller method returns if successful
          
          this.isLoading = false;
          
          // build a token that we capture from the response's headers (sent back from Spring)
          const token = data.headers.get('portal-token'); // grab the value of the token geenrated
          // running snapshot of who's logged
          sessionStorage.setItem('token', token); // so now we have acknowledged that the user is authenticated

          // set the isLoggedIn value in the app.component.ts file to TRUE
          this.appComponent.isLoggedIn = true;
          
          let loggedInUser = new User(data.body.id, data.body.username, data.body.password, data.body.email, data.body.songs);
          
          // updateUser data (to be show in all other components)
          this.appComponent.updateUserData(loggedInUser);

          console.log(new User(this.appComponent.id, this.appComponent.username, this.appComponent.password, this.appComponent.email, this.appComponent.songs))
          this.router.navigateByUrl('/home-page');
        },
        // what to do if it isn't successful
        () => {
          console.log('failed to login')
          this.isLoading = false;
          this.loginErrMsg =  'Failed to Login';
          swal.fire({
            icon: 'error',
            title: 'Whoopsie Daisies!',
            text: 'This username/password combination does not exist!',
          })
          
        }
      ); // what to do when data is returned? and what to do if there's an error

        // clear the input fields
        this.username = '';
        this.password = '';
        //this.router.navigate(['/home-page']);
  }
}
