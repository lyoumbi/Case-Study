import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { RegisterRequestPayload } from '../register/register-request.payload';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { LocalStorage } from '@ngx-pwa/local-storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginResponse: LoginResponse = {
                                    id : 0,
                                    email : '',
                                    initialBudget : 0,
                                    firstName : '',
                                    lastName : ''  
                                  };
  private sharedLoginResponse = new BehaviorSubject<LoginResponse>(this.loginResponse);
  sharedLoginResponseObservable = this.sharedLoginResponse.asObservable();

  constructor(private httpClient: HttpClient, private localStorage: LocalStorage) { }

  register(registerRequestPayload : RegisterRequestPayload) : Observable<any> {
    return this.httpClient.post<RegisterRequestPayload>('http://localhost:8080/api/auth/register', registerRequestPayload);
  }

  login(loginRequestPayload : LoginRequestPayload): Observable<LoginResponse> {
    return this.httpClient
               .post<LoginResponse>('http://localhost:8080/api/auth/login', loginRequestPayload)
               .pipe(map(data => {
                 if(data) {
                  this.loginResponse = data;
                  this.sharedLoginResponseFunction(this.loginResponse);
                   return this.loginResponse;
                 } else {
                  return null;
                 };
                }));
  }

  sharedLoginResponseFunction(value:LoginResponse) {
    this.sharedLoginResponse.next(value);
  }
}


