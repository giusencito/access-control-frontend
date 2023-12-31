import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators"
import { Login } from 'src/app/models/Login';
import { Register } from 'src/app/models/Register';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  basePath='http://localhost:8080/auth'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  constructor(private http:HttpClient) { }
  handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.log(`An error occurred: ${error.error.message} `);
  }
  else {
    console.error(
      `Backend returned code ${error.status}, body was: ${error.error}`
    );
  }
  
  return throwError('Something happened with request, please try again later');
  }
  Login(item:Login){
    return this.http.post<any>(`${this.basePath}/login`, item, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }
  Admin(item:Register){
    return this.http.post<any>(`${this.basePath}/admin`, item, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));

  }



}
