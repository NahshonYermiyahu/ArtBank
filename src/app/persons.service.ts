import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

export interface Person {
  CARD: string;
  LASTNAME: string;
  FIRSTNAME: string;
  PATRONYMIC: string;
  IDPERSON: number;
  STATUSNAME: string;
  ACC1NUM: string;
  CARDTEMPLNAME: string;
  ORGNAMESHORT: string;
  PERSONTYPENAME: string;
  CURRNAME: string;
  IDCARD: number;
  BIRTHDATE: string;
  DOCSERIES: string;
  DOCNUM: string;
  IDTASKAUTHSTATUS: number;
  DOCTYPENAME: string;
}


const apiHost = './assets/persons.json';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  errorMessages = new Map<number, string>();

  constructor(private http: HttpClient) {
    this.errorMessages.set(400, 'bad request');
    this.errorMessages.set(404, 'not found');
  }

  getPersons(): Observable<Person[]>{
    return this.http.get<Person[]>(apiHost)
      .pipe(map(res => res['data']))
      .pipe(catchError(this.handlerErrors.bind(this)));
  }

  // deletePerson(id) {
  //   return this.http.delete(`${apiHost}/${id}`)
  //     .pipe(catchError(this.handlerErrors.bind(this)));
  // }

  private handlerErrors(error: HttpErrorResponse) {
    if (!error.status) {
      return throwError(`${apiHost} isn\'t available, try again`);
    }
    if (this.errorMessages.has(error.status)) {
      return throwError(this.errorMessages.get(error.status));
    }
    return throwError(error.message);
  }
}
