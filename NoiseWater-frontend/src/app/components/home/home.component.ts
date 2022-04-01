import { Component, ElementRef, OnInit } from '@angular/core';

// set a variable to the user input to add to url
let songName = (<HTMLInputElement>document.getElementById('song-name'))

let respSong = (<HTMLInputElement>document.getElementById('resp-song'));
let respName = (<HTMLInputElement>document.getElementById('resp-name'));

let songNameVal = songName.value;


  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })




export class HomeComponent{


  constructor() { }

  ngOnInit(): void { }

  // displayStyle = "none";

  // openModal($event) {
  //   // console.log('Working.')
  //   this.displayStyle = "block";
  //   }

  // closeModal($event) {
  //     this.displayStyle = "none";


   fetchCall() {

    fetch(`https://itunes.apple.com/lookup?songTerm=${songNameVal}&entity=song&lim=5`)

      // turn response into json
      // .then(response => response.json())

      .then(this.rendorSong)
  }

  rendorSong(data) {

    respName.innerHTML = `Name: ${data.TrackName}`;


    // find the song data to display on home page
    // respSong.innerHTML = `Song: ${}`


  }

  }












