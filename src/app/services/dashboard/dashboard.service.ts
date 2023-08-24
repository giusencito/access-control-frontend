import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators"
import { Person } from 'src/app/models/Person';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  basePath='http://localhost:8080/api/v1/persons'
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
  getAll(): Observable<Person> {
    return this.http.get<Person>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  GetRates(){
    return this.http.get<any>(`${this.basePath}/states`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }
  Create(item:Person): Observable<Person>{
    return this.http.post<Person>(`${this.basePath}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }
  Update(id:number,item:Person): Observable<Person>{
    return this.http.put<Person>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));


  }
  FindByName(name:string){
    return this.http.get<Person>(`${this.basePath}/name/${name}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  FindByState(state:string){
    return this.http.get<Person>(`${this.basePath}/state/${state}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }








}
