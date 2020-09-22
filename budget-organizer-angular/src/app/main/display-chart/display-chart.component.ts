import { Component, OnInit } from '@angular/core';
import { LoginResponse } from 'src/app/login/login-response.payload';
import { AuthService } from 'src/app/shared/auth.service';
import { TransactionService } from 'src/app/shared/transaction-service.service';
import { AddItemRequestPayload } from '../add-item/add-item-resquest.payload';
import { TotalPayload } from './total.payload';

@Component({
  selector: 'app-display-chart',
  templateUrl: './display-chart.component.html',
  styleUrls: ['./display-chart.component.css']
})
export class DisplayChartComponent implements OnInit {

  loginResponse: LoginResponse;
  totalPayload : TotalPayload;

  transactionList : Array<AddItemRequestPayload> = [];

  constructor(private transactionService: TransactionService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.sharedLoginResponseObservable.subscribe(val => this.loginResponse = val);
    this.transactionService.sharedTransactionListObservable.subscribe(val => this.transactionList = val);
    this.authService.sharedTotalPayloadObservable.subscribe(val => this.totalPayload = val);
    this.authService.sharedTotalPayloadObservable.subscribe(val => this.totalPayload = val);
  }

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public chartLabels = ['Salary', 'Dividend', 'Gift', 'Tip', 'Transport', 'Groceries', 'Bill', 'Rent/Morgage', 'Clothes', 'Restaurant', 'Entertainment', 'Other'];
  public chartLegend = true;  
  public chartData = [{
                        data: [10, 20, 5, 5, 10, 10, 5, 20, 2, 3, 2, 3, 5],
                        backgroundColor: ['#e91e63', '#00e676', '#ff5722', '#1e88e5', '#ffd600', '#6C63FF', '#00FB21', '#FB00F3', '#1100FB', '#00F8FB', '#000000', '#771F3B', '#BF6916'],
                        borderWidth: 0.5,
                        borderColor: '#ddd'
                    }];
  public chartType = 'bar';

  chartTypeSwith(name : string) {
    this.chartType = name;
  }

  changedTotalPayload() {
    this.authService.sharedTotalPayloadFunction(this.totalPayload);
  }

}
