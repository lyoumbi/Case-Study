import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from 'src/app/login/login-response.payload';
import { AuthService } from 'src/app/shared/auth.service';
import { TransactionService } from 'src/app/shared/transaction-service.service';
import { AddItemRequestPayload } from '../add-item/add-item-resquest.payload';

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css']
})
export class DisplayTableComponent implements OnInit {

  transactionList : Array<AddItemRequestPayload> = [];
  addItemRequestPayload : AddItemRequestPayload;
  loginResponse: LoginResponse;

  constructor(private transactionService : TransactionService, private toastr : ToastrService, private authService : AuthService) {
   }

  ngOnInit(): void {
    this.authService.sharedLoginResponseObservable.subscribe(val => this.loginResponse = val);
    this.transactionService.currentSharedAddItemRequestPayload.subscribe(val => this.addItemRequestPayload = val);
    this.transactionService.sharedTransactionListObservable.subscribe(val => this.transactionList = val);
  }

  changeAddItemRequestPayload() {
    this.transactionService.sharedAddItemRequestPayloadFunction(this.addItemRequestPayload);
  }

  changeTansactionList() {
    this.transactionService.sharedTransactionListFunction(this.transactionList);
  }

  sendForUpdate(id : number) {

  }

  delete(id: number) {
    console.log("Id deleted = " + id);
    this.transactionService.deleteTransaction(id)
                           .subscribe(data => {
                            if(data !== null) {
                              this.transactionList = this.transactionService.getAllTransactions(this.loginResponse.id);
                              this.changeTransactionList();
                              this.toastr.success('Delete Data Successfully', 'CONFIRMATION');
                            } else {
                              this.toastr.error('Failed to Delete the data', 'ERROR');
                            }
                          });
  }

  changeTransactionList() {
    this.transactionService.sharedTransactionListFunction(this.transactionList);
  }
}
