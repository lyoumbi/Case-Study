import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegisterRequestPayload } from '../register/register-request.payload';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { TotalPayload } from '../main/display-chart/total.payload';
import { AddItemRequestPayload } from '../main/add-item/add-item-resquest.payload';
import { ChartDataPayload } from '../main/display-chart/chartData.payload';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  chartDataPayload : ChartDataPayload = {
                                          salary : 0,
                                          dividend : 0,
                                          gift : 0,
                                          tip : 0,
                                          transport : 0,
                                          groceries : 0,
                                          bill : 0,
                                          rentMorgage : 0,
                                          clothes : 0,
                                          restaurant : 0,
                                          entertainment : 0,
                                          other : 0
                                       };
  private sharedChartDataPayload = new BehaviorSubject<ChartDataPayload>(this.chartDataPayload);
  sharedChartDataPayloadObservable = this.sharedChartDataPayload.asObservable();

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

  sharedTotalPayloadFunction(value: TotalPayload) {
    this.sharedTotalPayload.next(value);
  }

  sharedChartDataPayFunction(value: ChartDataPayload) {
    this.sharedChartDataPayload.next(value);
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

    if(this.totalPayload.totalIncome + this.totalPayload.totalExpense == 0) {
      this.totalPayload.totalIncomePer = 0;
      this.totalPayload.totalExpensePer = 0;
    } else {
      this.totalPayload.totalIncomePer = Math.trunc(this.totalPayload.totalIncome*100/(this.totalPayload.totalIncome + this.totalPayload.totalExpense));
      this.totalPayload.totalExpensePer = Math.trunc(this.totalPayload.totalExpense*100/(this.totalPayload.totalIncome + this.totalPayload.totalExpense));
    }
    return this.totalPayload;
 }

 calculateChartData(transactions : Array<AddItemRequestPayload> ) : ChartDataPayload {
   this.chartDataPayload.salary = this.calculateTransactionType(transactions, 'salary');
   this.chartDataPayload.dividend = this.calculateTransactionType(transactions, 'dividend');
   this.chartDataPayload.gift = this.calculateTransactionType(transactions, 'gift');
   this.chartDataPayload.tip = this.calculateTransactionType(transactions, 'tip');
   this.chartDataPayload.transport = this.calculateTransactionType(transactions, 'transport');
   this.chartDataPayload.groceries = this.calculateTransactionType(transactions, 'groceries');
   this.chartDataPayload.bill = this.calculateTransactionType(transactions, 'bill');
   this.chartDataPayload.rentMorgage = this.calculateTransactionType(transactions, 'rent-morgage');
   this.chartDataPayload.clothes = this.calculateTransactionType(transactions, 'clothes');
   this.chartDataPayload.restaurant = this.calculateTransactionType(transactions, 'restaurant');
   this.chartDataPayload.entertainment = this.calculateTransactionType(transactions, 'entertainment');
   this.chartDataPayload.other = this.calculateTransactionType(transactions, 'other');
   return this.chartDataPayload;
 }

 calculateTransactionType(transactions : Array<AddItemRequestPayload>, transactionType : string) : number {
   if(this.totalPayload.totalIncome + this.totalPayload.totalExpense == 0) return 0;
  return  transactions.filter(transaction => transaction.transactionType === transactionType)
                      .map((transaction : AddItemRequestPayload) : number => {
                        if(transaction.amount) {
                          return transaction.amount;
                        } else {
                          return 0;
                        }
                      })
                      .reduce((a: number , b: number): number => a + b, 0)*100/(this.totalPayload.totalIncome + this.totalPayload.totalExpense);
 }


}


