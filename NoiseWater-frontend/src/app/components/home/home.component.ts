import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { UserService } from '../../service/user-service.service';
import { SongService} from '../../service/song.service';
import { ngbCarouselTransitionOut } from '@ng-bootstrap/ng-bootstrap/carousel/carousel-transition';
import Swal from 'sweetalert2';
import { User } from 'src/app/model/user';
import { Song } from 'src/app/model/user';
import { Router } from '@angular/router';
import { DeclarationListEmitMode } from '@angular/compiler';


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
  constructor(private songService : SongService, private router: Router, private userService : UserService, private http: HttpClient, private appComponent: AppComponent) { 
    
    if (!appComponent.username){
      this.router.navigateByUrl('login-page');
    } 

  }
  

//<img src="\assets\whiteLogo.png" id="logopic" alt="logopic">
  ngOnInit(): void { 
    
    //initalizes test
    
    const divelem = <HTMLDivElement>document.getElementById('paragraph');
    let outerDiv = document.getElementById("song-list-container");
    let para =document.createElement('p1');
    let text = document.createTextNode(`Hello, ${this.appComponent.username}!`)
    let child = para.appendChild(text);
    divelem.appendChild(child);
    
    let yourP = document.getElementById('h2');
    yourP?.setAttribute('style', 'font-weight: bold;')

    
    //initializes songs
    const list = document.createElement('ol');
    list.setAttribute("id", "listId")

    for(let i in this.appComponent.songs){
        this.http.get<any>(`https://itunes.apple.com/lookup?id=${this.appComponent.songs[i].songId}`).subscribe((data) => {
        
        let previUrl = data.results[0].previewUrl;
        let songTitle = this.appComponent.songs[i].songName;
        let artist = this.appComponent.songs[i].artistName;

        const songListDiv = document.createElement('div');
        songListDiv.setAttribute('class', 'w3-xlarge')
        //songListDiv.setAttribute('id', `i${i}`)
        let count = 0;
        for(let i in outerDiv?.children){
          count++;
        }
        songListDiv.setAttribute('id', `i${count-3}`);
        const title = document.createElement('h3');
        const artistName = document.createElement('h3');
        const player = document.createElement('audio');
        const source = document.createElement('source');
        const brk = document.createElement('br');
       
        const span = document.createElement('span');
        span.setAttribute('style', 'color: red')
        span.addEventListener('mouseleave', (evt) => span.setAttribute('style', 'color: red;'))
        span.addEventListener('mouseover', (evt) => span.setAttribute('style', 'color: orange;'))
        const icon = document.createElement('i');
        
        icon.setAttribute('class', 'fa fa-trash');
        
        icon.addEventListener('click',(evt) => {
          let num = parseInt(songListDiv.getAttribute('id')!.substring(1));
          this.deleteSong(num)
        });
        
        span.appendChild(icon)

        player.controls = true;
        player.setAttribute("class", "ap");
        
        source.setAttribute('src', previUrl);
        

        player.appendChild(source);
        
        player.setAttribute("preload", "auto")
        
        
        title.innerText = `Song: ${songTitle}`;
        artistName.innerText = `Artist: ${artist}`;

        let imgUrl = data.results[0].artworkUrl100;
        let imgElem = document.createElement('img');
        imgElem.setAttribute('src', imgUrl);
        imgElem.setAttribute('style', 'border: 5px solid #555;')

        songListDiv.appendChild(imgElem)
        songListDiv.appendChild(title);
        songListDiv.appendChild(artistName);
        songListDiv.appendChild(player);
        songListDiv.appendChild(span);
        songListDiv.appendChild(brk);
        //div.appendChild(brk)
        
        outerDiv?.appendChild(songListDiv);
        
      });
      }
     
      


}


  deleteSong(index : number){
    console.log("INDEX = " + index);
    let newSong = new Song(this.appComponent.songs[index].id, this.appComponent.songs[index].songId, this.appComponent.songs[index].songName, this.appComponent.songs[index].artistName);
    let newUser = new User(this.appComponent.id, this.appComponent.username, this.appComponent.password, this.appComponent.email, this.appComponent.songs);
    console.log(newSong);
    this.userService.removeSong(newSong, newUser).subscribe((data) =>{
      this.appComponent.updateUserData(new User(data.id, data.username, data.password, data.email, data.songs));
      let divElem = document.getElementById(`i${index}`)
      console.log(divElem);
      divElem?.remove();
      
      let outerDiv = document.getElementById('song-list-container')

      for(let i in outerDiv?.children){
        if (parseInt(i) >= index){
          let num = outerDiv?.children[parseInt(i)].getAttribute('id')?.substring(1);
          outerDiv?.children[parseInt(i)].setAttribute('id', `i${parseInt(num!)-1}`)
        }
        // console.log(i)
        // console.log(outerDiv?.childNodes[parseInt(i)]);
      }
      

      console.log(new User(this.appComponent.id, this.appComponent.username, this.appComponent.password, this.appComponent.email, this.appComponent.songs));
    });

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
    
    // testing button
    // console.log('button works');
    this.http.get<any>(`https://itunes.apple.com/search?term=${songNameRep}&entity=song&limit=10`).subscribe(response => this.rendorSong(response));
    //fetch(`https://itunes.apple.com/search?term=${songNameRep}`, { mode: 'no-cors'})
      // turn response into json
      //.then(response => response.json())
      //.then(this.rendorSong)
  }
  // rendering data returned from itunes API
  rendorSong(data: any) {
    // save the name returned from the api into a variable
    
    
    let outerDiv = document.getElementById('song-list-container');
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
      
      const span = document.createElement('span');
      span.setAttribute('style', 'color: dodgerblue')
      span.addEventListener('mouseleave', (evt) => span.setAttribute('style', 'color: dodgerblue;'))
      span.addEventListener('mouseover', (evt) => span.setAttribute('style', 'color: red;'))
      icon.setAttribute('class', 'fa fa-thumbs-up');
      icon.addEventListener('click',(evt) => addSong(i));
      span.appendChild(icon)

      player.controls = true;
      player.setAttribute("class", "ap");
      
      source.setAttribute('src', previUrl);
      

      player.appendChild(source);
      
      player.setAttribute("preload", "auto")
      
      
      title.innerText = `Song: ${songTitle}`;
      artistName.innerText = `Artist: ${artist}`;

      let imgUrl = data.results[i].artworkUrl100;
      let imgElem = document.createElement('img');
      imgElem.setAttribute('src', imgUrl);
      imgElem.setAttribute('style', 'border: 5px solid #555;')

      

      div.appendChild(imgElem)
      div.appendChild(title);
      div.appendChild(artistName);
      div.appendChild(player);
      div.appendChild(span);
      //div.appendChild(brk)
      
      list.appendChild(brk)
      list.appendChild(div);
      
    }


    Swal.fire({
      icon: 'info',
      title: "Here's what we found:",
      html: list,
      //color: '#716add',
    }
    );

  let apc = this.appComponent;
  let userve = this.userService;
  let d = data;
  let addSong = (s : string) =>{
        let index = parseInt(s);

        
        // console.log((data.results[index].previewUrl))

        apc.songs.push(new Song(0, data.results[index].trackId, data.results[index].trackName, data.results[index].artistName))
        // console.log(apc.songs)
        let addedUser = new User(apc.id, apc.username, apc.password, apc.email, [apc.songs[apc.songs.length-1]])
        // console.log(addedUser);

        userve.addSong(addedUser).subscribe((data) => {
          this.appComponent.updateUserData(new User(data.id, data.username, data.password, data.email, data.songs));

          let listToAppendTo = document.getElementById('song-list-container');
          let previUrl = d.results[index].previewUrl;
          let songTitle = d.results[index].trackName;
          let artist = d.results[index].artistName;

          const div = document.createElement('div');
          div.setAttribute('class', 'w3-xlarge')
          
          let count = 0;
          for(let i in outerDiv?.children){
            count++;
          }
          div.setAttribute('id', `i${count-3}`);
          console.log(div.getAttribute('id'));
          const title = document.createElement('h3');
          const artistName = document.createElement('h3');
          const player = document.createElement('audio');
          const source = document.createElement('source');
          const brk = document.createElement('br');
          
          
          const span = document.createElement('span');
          span.setAttribute('style', 'color: red')
          span.addEventListener('mouseleave', (evt) => span.setAttribute('style', 'color: red;'))
          span.addEventListener('mouseover', (evt) => span.setAttribute('style', 'color: orange;'))
          const icon = document.createElement('i');

          icon.setAttribute('class', 'fa fa-trash');
          //icon.setAttribute('id', `${i}`);
          //icon.setAttribute('(click)', `addSong(${i})`);
          //icon.addEventListener('click', addSong(i));
          
          icon.addEventListener('click',(evt) => {
            let num = parseInt(div.getAttribute('id')!.substring(1));
            this.deleteSong(num)
          });
          
          span.appendChild(icon);

          player.controls = true;
          player.setAttribute("class", "ap");
          
          source.setAttribute('src', previUrl);
          
    
          player.appendChild(source);
          
          player.setAttribute("preload", "auto")
          
          
          title.innerText = `Song: ${songTitle}`;
          artistName.innerText = `Artist: ${artist}`;
          
          let imgUrl = d.results[index].artworkUrl100;
          let imgElem = document.createElement('img');
          imgElem.setAttribute('src', imgUrl);
          imgElem.setAttribute('style', 'border: 5px solid #555;')
  
          div.appendChild(imgElem)
          div.appendChild(title);
          div.appendChild(artistName);
          div.appendChild(player);
          div.appendChild(span);
          div.appendChild(brk);


          listToAppendTo?.appendChild(div);
          // let deleteSong2 = (index : number) =>{
          //   let newSong = new Song(this.appComponent.songs[index].id, this.appComponent.songs[index].songId, this.appComponent.songs[index].songName, this.appComponent.songs[index].artistName);
          //   let newUser = new User(this.appComponent.id, this.appComponent.username, this.appComponent.password, this.appComponent.email, this.appComponent.songs);
          //   console.log(newSong);
          //   this.userService.removeSong(newSong, newUser).subscribe((data) =>{
          //     this.appComponent.updateUserData(new User(data.id, data.username, data.password, data.email, data.songs));
              
          //     this.updatePageAfterDelete();
              
          //   });
          // }

        });
        
        

        //this.updatePage();
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