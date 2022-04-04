import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/user';
import { Song } from '../model/user';
import { catchError, Observable, throwError } from 'rxjs';
import { url } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  
  private usersUrl: string;
  httpOptions = {
      headers: new HttpHeaders({'Content-Type' : 'application/json'})
    }
  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/songs';
  }
  private handleError(httpError: HttpErrorResponse) {

    if (httpError.error instanceof ErrorEvent) {
      console.log('An error occured: ', httpError.error.message)
    } else {
      console.error(`
      Backend returned code ${httpError.status}
      body was: ${httpError.error}`)
    }

    return throwError(() => new Error('something really bad happened, please try again later'))
  }
  removeSong(s : Song){
    return this.http.post<User>(`songs/removesong`, s, this.httpOptions)
    .pipe(catchError(this.handleError));
  }
}
