import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/user';
import { Song } from '../model/user';
import { catchError, Observable, throwError } from 'rxjs';
import { url } from './../../environments/environment';


const userUrl = url + `/users`;
@Injectable()
export class UserService {

  private usersUrl: string;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }
  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public save(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }

  registerUser(user: User): Observable<User> {
    // 3 params: url, object in request body, options (headers)
    return this.http.post<User>(`${userUrl}/register`, user, this.httpOptions)
      .pipe(catchError(this.handleError)); // pass a callback function if something goes wrong
      // catchError comes from rxjs
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
  addSong(user: User): Observable<User> {
    // 3 params: url, object in request body, options (headers)
    return this.http.post<User>(`${userUrl}/addsong`, user, this.httpOptions)
      .pipe(catchError(this.handleError)); // pass a callback function if something goes wrong
      // catchError comes from rxjs
  }


  deleteAccount(user: User): Observable<User>{
    var randomvariable = this.http.post<User>(`${userUrl}/removeuser`, user, this.httpOptions)
    .pipe(catchError(this.handleError));
    return randomvariable;
  }

  search(user: User): Observable<User>{
    return this.http.post<User>(`${userUrl}/findNoPwd`, user, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  removeSong(s : Song, u : User){
    s.artistName = u.username;
    return this.http.post<User>(`${userUrl}/deletesong`, s, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

}
