import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { UserService } from '../../service/user-service.service';
import { ngbCarouselTransitionOut } from '@ng-bootstrap/ng-bootstrap/carousel/carousel-transition';
import Swal from 'sweetalert2';
import { User } from 'src/app/model/user';
import { Song } from 'src/app/model/user';
import { Router } from '@angular/router';

let songName;
let respSong;
let respName: HTMLInputElement;
let songNameVal;

  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
export class HomeComponent{


  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }
  constructor(private router: Router, private userService : UserService, private http: HttpClient, private appComponent: AppComponent) { 
    
    if (!appComponent.username){
      this.router.navigateByUrl('login-page');
    } 

  }
  

//<img src="\assets\whiteLogo.png" id="logopic" alt="logopic">
  ngOnInit(): void { 
    const divelem = <HTMLDivElement>document.getElementById('paragraph');
    let para =document.createElement('p1');
    let text = document.createTextNode(`A ${this.appComponent.username} Type Beat!`)
    let child = para.appendChild(text);
    divelem.appendChild(child);

    console.log(this.appComponent.songs);
    // let u = this.userService.search(new User(0, this.appComponent.username, '', '', []));
    // console.log(u)

}
  
  // displayStyle = "none";
  // openModal($event) {
  //   // console.log('Working.')
  //   this.displayStyle = "block";
  //   }
  // closeModal($event) {
  //     this.displayStyle = "none";
  displayStyle = "none";
  openModal() {
    // console.log('Working.')
   this.displayStyle = "block";
  }
  closeModal() {
    this.displayStyle = "none";
}
  
  fetchCall() {
    
    let songName = (<HTMLInputElement>document.getElementById('song-name'))
    // getting user input and removing and whitespace before&after
    var songNameVal = songName.value.trim();
    // replacing space in song input with "+" to fit url syntax
    // has higher time complexity than using regex -- change to regex syntax to be faster
    var songNameRep = songNameVal.split(' ').join('+');
    console.log(songNameRep);
    // testing button
    // console.log('button works');
    this.http.get<any>(`https://itunes.apple.com/search?term=${songNameRep}&entity=song&limit=5`).subscribe(response => this.rendorSong(response));
    //fetch(`https://itunes.apple.com/search?term=${songNameRep}`, { mode: 'no-cors'})
      // turn response into json
      //.then(response => response.json())
      //.then(this.rendorSong)
  }
  // rendering data returned from itunes API
  rendorSong(data: any) {
    // save the name returned from the api into a variable
    
    
    
    const list = document.createElement('ul');

    for(let i in data.results){
      
      let previUrl = data.results[i].previewUrl;
      let songTitle = data.results[i].trackName;
      let artist = data.results[i].artistName;

      const div = document.createElement('div');
      div.setAttribute('class', 'w3-xlarge')
      const title = document.createElement('h3');
      const artistName = document.createElement('h3');
      const player = document.createElement('audio');
      const source = document.createElement('source');
      const brk = document.createElement('br');
      const icon = document.createElement('i');

      icon.setAttribute('class', 'fa fa-thumbs-up');
      //icon.setAttribute('id', `${i}`);
      //icon.setAttribute('(click)', `addSong(${i})`);
      //icon.addEventListener('click', addSong(i));
      icon.addEventListener('click',(evt) => addSong(i));
      
      player.controls = true;
      player.setAttribute("class", "ap");
      
      source.setAttribute('src', previUrl);
      

      player.appendChild(source);
      
      player.setAttribute("preload", "auto")
      
      
      title.innerText = `Song: ${songTitle}`;
      artistName.innerText = `Artist: ${artist}`;
      
      div.appendChild(title);
      div.appendChild(artistName);
      div.appendChild(player);
      div.appendChild(icon);
      //div.appendChild(brk)
      
      list.appendChild(div);
    }


    Swal.fire({
      html: list,
      //color: '#716add',
    }
    );

  let apc = this.appComponent;
  let userve = this.userService;
  function addSong(s : string){
        
        let deletedUser = new User(apc.id, apc.username, apc.password, apc.email, []);
    
        let index = parseInt(s);
        apc.songs.push(new Song(0, data.results[index].trackId, data.results[index].trackName, data.results[index].artistName, data.results[index].previewUrl))
        let addedUser = new User(apc.id, apc.username, apc.password, apc.email, [apc.songs[apc.songs.length-1]])

        userve.addSong(addedUser).subscribe();
        //apc.songs.pop();
        // userve.deleteAccount(deletedUser).subscribe((data) => {console.log(data); console.log('success delete!')}, (error) =>{console.log(error)});
        
        // userve.registerUser(addedUser)
        //     .subscribe((data) => {console.log(data); console.log('success register!')}, (error) =>{console.log(error)}
        // );
      }
    
  }


  deleteAccount(){

    Swal.fire({
      icon: 'question',
      title: 'Are you sure you want to do this?',
      text: 'Your account information will be gone forever.',
      showDenyButton: true,
      confirmButtonText: 'Delete Account',
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Your account is deleted. Goodbye forever.')
        this.appComponent.songs = [];
        let deletedUser = new User(this.appComponent.id, this.appComponent.username, this.appComponent.password, this.appComponent.email, this.appComponent.songs);
        //console.log(deletedUser);
        this.userService.deleteAccount(deletedUser).subscribe();

        this.appComponent.updateUserData(new User(0,'','','',[]));
        this.router.navigateByUrl('/login-page');
      } 
    })
  }

  logout(){
    this.appComponent.updateUserData(new User(0,'','','',[]));
    this.router.navigateByUrl('/login-page');
  }

  }