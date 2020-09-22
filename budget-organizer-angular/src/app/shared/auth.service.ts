import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegisterRequestPayload } from '../register/register-request.payload';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { TotalPayload } from '../main/display-chart/total.payload';
import { AddItemRequestPayload } from '../main/add-item/add-item-resquest.payload';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  totalPayload : TotalPayload = {
                                  initialBudget : 0,
                                  availableBudget: 0,
                                  totalIncome : 0,
                                  totalExpense: 0,
                                  totalIncomePer: 0,
                                  totalExpensePer: 0
                                };
private sharedTotalPayload = new BehaviorSubject<TotalPayload>(this.totalPayload);
sharedTotalPayloadObservable = this.sharedTotalPayload.asObservable();

  loginResponse: LoginResponse = {
                                    id : 0,
                                    email : '',
                                    initialBudget : 0,
                                    firstName : '',
                                    lastName : ''  
                                  };
  private sharedLoginResponse = new BehaviorSubject<LoginResponse>(this.loginResponse);
  sharedLoginResponseObservable = this.sharedLoginResponse.asObservable();

  isLogin : boolean = false;
  private sharedIsLogin = new BehaviorSubject<boolean>(this.isLogin);
  sharedIsLoginObservable = this.sharedIsLogin.asObservable();

  constructor(private httpClient: HttpClient) {
    this.sharedLoginResponseObservable.subscribe(val => this.loginResponse = val);
  }

  register(registerRequestPayload : RegisterRequestPayload) : Observable<any> {
    return this.httpClient.post<RegisterRequestPayload>('http://localhost:8080/api/auth/register', registerRequestPayload);
  }

  login(loginRequestPayload : LoginRequestPayload): Observable<LoginResponse> {
    return this.httpClient
               .post<LoginResponse>('http://localhost:8080/api/auth/login', loginRequestPayload);
  }

  sharedLoginResponseFunction(value:LoginResponse) {
    this.sharedLoginResponse.next(value);
  }

  sharedIsLoginFunction(value : boolean) {
    this.sharedIsLogin.next(value);
  }

  sharedTotalPayloadFunction(value: TotalPayload) {
    this.sharedTotalPayload.next(value);
  }

  calculateTotals(transactions : Array<AddItemRequestPayload> ) : TotalPayload {
    this.totalPayload.initialBudget = this.loginResponse.initialBudget;
    this.totalPayload.totalExpense = transactions.filter(transaction => transaction.type === 'expense')
                                                 .map((transaction : AddItemRequestPayload) : number => transaction.amount)
                                                 .reduce((a: number , b: number): number => a + b, 0);
    this.totalPayload.totalIncome = transactions.filter(transaction => transaction.type === 'income')
                                                .map((transaction : AddItemRequestPayload) : number => transaction.amount)
                                                .reduce((a: number , b: number): number => a + b, 0);
    this.totalPayload.availableBudget = this.totalPayload.initialBudget + this.totalPayload.totalIncome - this.totalPayload.totalExpense;
    this.totalPayload.totalIncomePer = Math.trunc(this.totalPayload.totalIncome*100/(this.totalPayload.initialBudget + this.totalPayload.totalIncome + this.totalPayload.totalExpense));
    this.totalPayload.totalExpensePer = Math.trunc(this.totalPayload.totalExpense*100/(this.totalPayload.initialBudget + this.totalPayload.totalIncome + this.totalPayload.totalExpense));
    return this.totalPayload;
}
}


