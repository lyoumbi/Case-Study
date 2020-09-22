import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from 'src/app/login/login-response.payload';
import { AuthService } from 'src/app/shared/auth.service';
import { TransactionService } from 'src/app/shared/transaction-service.service';
import { AddItemRequestPayload } from './add-item-resquest.payload';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  addForm : FormGroup;
  transactionList : Array<AddItemRequestPayload> = [];
  addItemRequestPayload : AddItemRequestPayload;
  loginResponse: LoginResponse;

  constructor(private transactionService: TransactionService, private authService: AuthService, private toastr: ToastrService) { 
    this.addItemRequestPayload = {
                   id : 0.0,  
      transactionType : '',
                 type : '',
          description : '',
             location : '',
               amount : 0.0,
                 date : ''
    }
  }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      transactionType : new FormControl(''),
                 type : new FormControl(''),
          description : new FormControl('New Transaction'),
             location : new FormControl('Store or Online'),
               amount : new FormControl(0.0, Validators.pattern("^[0-9]+(\.[0-9][0-9])?$")),
                 date : new FormControl('')
    });

    this.authService.sharedLoginResponseObservable.subscribe(val => this.loginResponse = val);
    this.transactionService.currentSharedAddItemRequestPayload.subscribe(val => this.addItemRequestPayload = val);
    this.transactionService.sharedTransactionListObservable.subscribe(val => this.transactionList = val);
  }

  addTransaction() {
    this.addItemRequestPayload.type = this.addForm.get('type').value;
    this.addItemRequestPayload.transactionType = this.addForm.get('transactionType').value;
    this.addItemRequestPayload.description = this.addForm.get('description').value;
    this.addItemRequestPayload.location = this.addForm.get('location').value;
    this.addItemRequestPayload.amount = this.addForm.get('amount').value;

    if(this.addForm.get('date').value === '') {
      this.addItemRequestPayload.date = this.getCurrentDate();
    } else {
      this.addItemRequestPayload.date = this.addForm.get('date').value;
    }
    

    this.transactionService.addTransaction(this.addItemRequestPayload, this.loginResponse.id)
                           .subscribe(data => {
                             if(data) {
                              this.transactionList = this.transactionService.getAllTransactions(this.loginResponse.id);
                              this.changeTransactionList();
                              this.toastr.success('Transction Created!', 'CONFIRMATION');
                             } else {
                              this.toastr.error('Transaction not created, Try again!', 'ERROR');
                             }
                           });
  }

  getCurrentDate() : string {
    return new Date().getFullYear() + '-' + (new Date().getMonth() >=10 ? new Date().getMonth() : '0' + new Date().getMonth())  
            + '-' + (new Date().getDate() >= 10 ? new Date().getDate() : '0' + new Date().getDate());
  }

  changeAddItemRequestPayload() {
    this.transactionService.sharedAddItemRequestPayloadFunction(this.addItemRequestPayload);
  }

  changeTransactionList() {
    this.transactionService.sharedTransactionListFunction(this.transactionList);
  }

}
