import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddItemRequestPayload } from '../main/add-item/add-item-resquest.payload';
import { ChartDataPayload } from '../main/display-chart/chartData.payload';
import { TotalPayload } from '../main/display-chart/total.payload';
import { AuthService } from '../shared/auth.service';
import { TransactionService } from '../shared/transaction-service.service';
import { LoginRequestPayload } from './login-request.payload';
import { LoginResponse } from './login-response.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLogin : boolean = false;
  loginRequestPayload: LoginRequestPayload;
  totalPayload : TotalPayload;
  loginResponse: LoginResponse;
  chartDataPayload : ChartDataPayload;
  transactionList : Array<AddItemRequestPayload> = [];

  constructor(private authService: AuthService, private router : Router, private toastr : ToastrService, private transactionService : TransactionService) {
    this.loginRequestPayload = {
      email : '',
      password : ''
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required)
    });

    this.authService.sharedLoginResponseObservable.subscribe(val => this.loginResponse = val);
    this.transactionService.sharedTransactionListObservable.subscribe(val => this.transactionList = val);
    this.authService.sharedIsLoginObservable.subscribe(val => this.isLogin = val);
    this.authService.sharedTotalPayloadObservable.subscribe(val => this.totalPayload = val);
    this.authService.sharedChartDataPayloadObservable.subscribe(val => this.chartDataPayload = val);
  }


  login() {
    this.loginRequestPayload.email = this.loginForm.get('email').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;
    
    this.authService.login(this.loginRequestPayload).subscribe(data => {
                            if(data !== null) {
                              this.loginResponse = data;
                              this.changeLoginResponse();
                              this.transactionList = this.transactionService.getAllTransactions(data.id);
                              this.changeTransactionList();
                              setTimeout(() => {
                                this.totalPayload = this.authService.calculateTotals(this.transactionList);
                                this.changedTotalPayload();
                                this.chartDataPayload = this.authService.calculateChartData(this.transactionList);
                                this.changeChartDataPayload();
                              }, 500);
                              this.isLogin = false;
                              this.changeIsLogin();
                              this.router.navigateByUrl('/budget-organizer');
                            } else {
                              this.toastr.error('Email or Password not valid!', 'LOGIN ERROR');
                            }
                          }); 

 }

  changeLoginResponse() {
    this.authService.sharedLoginResponseFunction(this.loginResponse);
  }

  changeTransactionList() {
    this.transactionService.sharedTransactionListFunction(this.transactionList);
  }

  changeIsLogin() {
    this.authService.sharedIsLoginFunction(this.isLogin);
  }

  changedTotalPayload() {
    this.authService.sharedTotalPayloadFunction(this.totalPayload);
  }

  changeChartDataPayload() {
    this.authService.sharedChartDataPayFunction(this.chartDataPayload);
  }

}
