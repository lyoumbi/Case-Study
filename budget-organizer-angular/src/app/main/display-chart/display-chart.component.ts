import { Component, OnInit } from '@angular/core';
import { LoginResponse } from 'src/app/login/login-response.payload';
import { AuthService } from 'src/app/shared/auth.service';
import { TransactionService } from 'src/app/shared/transaction-service.service';
import { AddItemRequestPayload } from '../add-item/add-item-resquest.payload';
import { ChartDataPayload } from './chartData.payload';
import { TotalPayload } from './total.payload';

@Component({
  selector: 'app-display-chart',
  templateUrl: './display-chart.component.html',
  styleUrls: ['./display-chart.component.css']
})
export class DisplayChartComponent implements OnInit {

  loginResponse: LoginResponse;
  totalPayload : TotalPayload;
  chartDataPayload : ChartDataPayload;

  transactionList : Array<AddItemRequestPayload> = [];

  constructor(private transactionService: TransactionService, private authService: AuthService) { 
    this.authService.sharedChartDataPayloadObservable.subscribe(val => this.chartDataPayload = val);
  }

  ngOnInit(): void {
    this.authService.sharedLoginResponseObservable.subscribe(val => this.loginResponse = val);
    this.transactionService.sharedTransactionListObservable.subscribe(val => this.transactionList = val);
    this.authService.sharedTotalPayloadObservable.subscribe(val => this.totalPayload = val);
    this.authService.sharedTotalPayloadObservable.subscribe(val => this.totalPayload = val);
    this.authService.sharedChartDataPayloadObservable.subscribe(val => this.chartDataPayload = val);
  }

  chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  chartLabels = ['Salary', 'Dividend', 'Gift', 'Tip', 'Transport', 'Groceries', 'Bill', 'Rent/Morgage', 'Clothes', 'Restaurant', 'Entertainment', 'Other'];
  chartLegend = true;  

  chartType = 'bar';

  chartDataBuilder(value: ChartDataPayload) {
    return [{data: [value.salary, value.dividend, value.gift, value.tip, value.transport, value.groceries, value.bill, 
             value.rentMorgage, value.clothes, value.restaurant, value.entertainment, value.other],
              backgroundColor: ['#e91e63', '#00e676', '#ff5722', '#1e88e5', '#ffd600', '#6C63FF', '#00FB21', '#FB00F3', '#1100FB', '#00F8FB', '#000000', '#771F3B'],
              borderWidth: 0.5,
              borderColor: '#ddd'
          }];
  }
}
