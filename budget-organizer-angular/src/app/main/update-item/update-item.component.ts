import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from 'src/app/login/login-response.payload';
import { AuthService } from 'src/app/shared/auth.service';
import { TransactionService } from 'src/app/shared/transaction-service.service';
import { AddItemRequestPayload } from '../add-item/add-item-resquest.payload';
import { ChartDataPayload } from '../display-chart/chartData.payload';
import { TotalPayload } from '../display-chart/total.payload';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  updateForm : FormGroup =  new FormGroup({
                                            transactionType : new FormControl(''),
                                                      type : new FormControl(''),
                                                description : new FormControl('New Transaction'),
                                                  location : new FormControl('Store or Online'),
                                                    amount : new FormControl(0.0, Validators.pattern("^[0-9]+(\.[0-9][0-9])?$")),
                                                      date : new FormControl('')
                                          });

  transactionList : Array<AddItemRequestPayload> = [];
  addItemRequestPayload : AddItemRequestPayload = {
                                                        id : 0.0,  
                                                    transactionType : '',
                                                      type : '',
                                                    description : '',
                                                    location : '',
                                                    amount : 0.0,
                                                      date : ''
                                                      
                                                  }
  loginResponse: LoginResponse;
  totalPayload : TotalPayload;
  isUpdate : boolean = false;
  chartDataPayload : ChartDataPayload;

  constructor(private transactionService: TransactionService, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authService.sharedLoginResponseObservable.subscribe(val => this.loginResponse = val);
    this.transactionService.currentSharedAddItemRequestPayload.subscribe(val => this.addItemRequestPayload = val);
    this.transactionService.sharedTransactionListObservable.subscribe(val => this.transactionList = val);
    this.authService.sharedTotalPayloadObservable.subscribe(val => this.totalPayload = val);
    this.authService.sharedChartDataPayloadObservable.subscribe(val => this.chartDataPayload = val);
  }

  updateTransaction(id : number) {
    this.addItemRequestPayload.type = this.updateForm.get('type').value;
    this.addItemRequestPayload.transactionType = this.updateForm.get('transactionType').value;
    this.addItemRequestPayload.description = this.updateForm.get('description').value;
    this.addItemRequestPayload.location = this.updateForm.get('location').value;
    this.addItemRequestPayload.amount = this.updateForm.get('amount').value;

    if(this.updateForm.get('date').value === '') {
      this.addItemRequestPayload.date = this.getCurrentDate();
    } else {
      this.addItemRequestPayload.date = this.updateForm.get('date').value;
    }

    this.transactionService.updateTransaction(this.addItemRequestPayload, id)
                           .subscribe(data => {
                             if(data) {
                              this.transactionList = this.transactionService.getAllTransactions(this.loginResponse.id);
                              this.changeTransactionList();
                              setTimeout(() => {
                                this.totalPayload = this.authService.calculateTotals(this.transactionList);
                                this.changedTotalPayload();
                                this.chartDataPayload = this.authService.calculateChartData(this.transactionList);
                                this.changeChartDataPayload();
                              }, 500);
                              this.isUpdate = false;
                              this.changeIsUpdate();
                              this.toastr.success('Transction Updated', 'CONFIRMATION');
                             } else {
                              this.isUpdate = false;
                              this.changeIsUpdate();
                              this.toastr.error('Transaction not Update, Try again!', 'ERROR');
                             }
                           });

  }

  changeAddItemRequestPayload() {
    this.transactionService.sharedAddItemRequestPayloadFunction(this.addItemRequestPayload);
  }

  changeTransactionList() {
    this.transactionService.sharedTransactionListFunction(this.transactionList);
  }

  getCurrentDate() : string {
    return new Date().getFullYear() + '-' + (new Date().getMonth() >=10 ? new Date().getMonth() : '0' + new Date().getMonth())  
            + '-' + (new Date().getDate() >= 10 ? new Date().getDate() : '0' + new Date().getDate());
  }

  changeIsUpdate() {
    this.transactionService.shareIsUpdateFunction(this.isUpdate);
  }

  changedTotalPayload() {
    this.authService.sharedTotalPayloadFunction(this.totalPayload);
  }

  changeChartDataPayload() {
    this.authService.sharedChartDataPayFunction(this.chartDataPayload);
  }


}
