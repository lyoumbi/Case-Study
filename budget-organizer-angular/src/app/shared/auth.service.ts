import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { RegisterRequestPayload } from '../register/register-request.payload';
import { Observable } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { LocalStorage } from '@ngx-pwa/local-storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private localStorage: LocalStorage) { }

  register(registerRequestPayload : RegisterRequestPayload) : Observable<any> {
    return this.httpClient.post<RegisterRequestPayload>('http://localhost:8080/api/auth/register', registerRequestPayload);
  }

  login(loginRequestPayload : LoginRequestPayload): Observable<boolean> {
    return this.httpClient
               .post<LoginResponse>('http://localhost:8080/api/auth/login', loginRequestPayload)
               .pipe(map(data => {
                 if(data) {
                  this.localStorage.setItem('loginUserId', data.id, {type: 'number'}).subscribe(() => {});
                  this.localStorage.setItem('loginUserEmail', data.email, {type: 'string'}).subscribe(() => {});
                  this.localStorage.setItem('loginUserInitialBudget', data.initialBudget, {type: 'number'}).subscribe(() => {});
                  this.localStorage.setItem('loginUserFirstName', data.firstName, {type: 'string'}).subscribe(() => {});
                  this.localStorage.setItem('loginUserLastName', data.lastName, {type: 'string'}).subscribe(() => {});
                   return true;
                 } else {
                  return false;
                 };
                }));
  }
}
