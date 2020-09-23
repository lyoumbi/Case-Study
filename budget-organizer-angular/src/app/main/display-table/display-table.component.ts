import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from 'src/app/login/login-response.payload';
import { AuthService } from 'src/app/shared/auth.service';
import { TransactionService } from 'src/app/shared/transaction-service.service';
import { AddItemRequestPayload } from '../add-item/add-item-resquest.payload';
import { ChartDataPayload } from '../display-chart/chartData.payload';
import { TotalPayload } from '../display-chart/total.payload';

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css']
})
export class DisplayTableComponent implements OnInit {

  transactionList : Array<AddItemRequestPayload> = [];
  addItemRequestPayload : AddItemRequestPayload;
  loginResponse: LoginResponse;
  isUpdate : boolean = false;
  totalPayload : TotalPayload;
  chartDataPayload : ChartDataPayload;

  constructor(private transactionService : TransactionService, private toastr : ToastrService, private authService : AuthService) {
   }

  ngOnInit(): void {
    this.authService.sharedLoginResponseObservable.subscribe(val => this.loginResponse = val);
    this.transactionService.currentSharedAddItemRequestPayload.subscribe(val => this.addItemRequestPayload = val);
    this.transactionService.sharedTransactionListObservable.subscribe(val => this.transactionList = val);
    this.transactionService.sharedIsUpdateObservable.subscribe(val => this.isUpdate = val);
    this.authService.sharedTotalPayloadObservable.subscribe(val => this.totalPayload = val);
    this.authService.sharedChartDataPayloadObservable.subscribe(val => this.chartDataPayload = val);
  }

  changeAddItemRequestPayload() {
    this.transactionService.sharedAddItemRequestPayloadFunction(this.addItemRequestPayload);
  }

  changeTansactionList() {
    this.transactionService.sharedTransactionListFunction(this.transactionList);
  }

  changeChartDataPayload() {
    this.authService.sharedChartDataPayFunction(this.chartDataPayload);
  }

  sendForUpdate(id : number) {
    this.transactionService.getTransaction(id)
                           .subscribe(data => {
                                        this.addItemRequestPayload.id = data.id;
                                        this.addItemRequestPayload.type = data.type;
                                        this.addItemRequestPayload.transactionType = data.transactionType;
                                        this.addItemRequestPayload.description = data.description;
                                        this.addItemRequestPayload.location = data.location;
                                        this.addItemRequestPayload.date = data.date;
                                        this.addItemRequestPayload.amount = data.amount;
                                        this.changeAddItemRequestPayload();

                                        this.isUpdate = true;
                                        this.changeIsUpdate();
                                     });
  }

  delete(id: number) {
    this.transactionService.deleteTransaction(id)
                           .subscribe(data => {
                            if(data !== null) {
                              this.transactionList = this.transactionService.getAllTransactions(this.loginResponse.id);
                              this.changeTransactionList();
                              setTimeout(() => {
                                this.totalPayload = this.authService.calculateTotals(this.transactionList);
                                this.changedTotalPayload();
                                this.chartDataPayload = this.authService.calculateChartData(this.transactionList);
                                this.changeChartDataPayload();
                              }, 100);
                              this.toastr.success('Delete Data Successfully', 'CONFIRMATION');
                            } else {
                              this.toastr.error('Failed to Delete the data', 'ERROR');
                            }
                          });
  }

  changeTransactionList() {
    this.transactionService.sharedTransactionListFunction(this.transactionList);
  }

  changeIsUpdate() {
    this.transactionService.shareIsUpdateFunction(this.isUpdate);
  }

  changedTotalPayload() {
    this.authService.sharedTotalPayloadFunction(this.totalPayload);
  }
}
