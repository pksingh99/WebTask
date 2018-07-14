import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject } from './subject';
import { SubjectModule } from './subject.module';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SubjectService {

  private apiUrl = 'http://localhost:8080/WebTask/subjects';

  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }

  findById(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id).pipe(
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }

  save(subject: Subject): Observable<any> {
    return this.http.post(this.apiUrl, subject).pipe(
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id).pipe(
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }

  update(subject: Subject): Observable<any> {
    return this.http.put(this.apiUrl + '/' + subject.id, subject).pipe(
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }

  findAllSubjectsPageable(page: number, elementsPerPage: number, searchTerm?: string): Observable<any> {
    let searchParam = '';
    if (searchTerm != null) {
      searchParam = '&searchTerm=' + searchTerm;
    }
    return this.http.get(this.apiUrl + '/page?page=' + page +
                        '&elements_per_page=' + elementsPerPage + searchParam).pipe(
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }
}