import { Component, ElementRef, OnInit } from '@angular/core';

  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })



export class HomeComponent{


  constructor() { }

  ngOnInit(): void { }

  displayStyle = "none";

  openModal($event) {

    console.log('Working.')
    this.displayStyle = "block";

    }

  closeModal($event) {

      this.displayStyle = "none";
  }






}





