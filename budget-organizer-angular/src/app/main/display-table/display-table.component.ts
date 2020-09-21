import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/shared/transaction-service.service';
import { AddItemRequestPayload } from '../add-item/add-item-resquest.payload';

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css']
})
export class DisplayTableComponent implements OnInit {

  transactionList : Array<AddItemRequestPayload> = [];
  isNewRowCreated : boolean;
  addItemRequestPayload : AddItemRequestPayload;

  constructor(private transactionService : TransactionService) {
    this.displayTable();
   }

  ngOnInit(): void {
    this.transactionService.currentValue.subscribe(val => this.isNewRowCreated = val);
    this.transactionService.currentSharedAddItemRequestPayload.subscribe(val => this.addItemRequestPayload = val);
  }

  displayTable() {
    this.transactionList = this.transactionService.getAllTransaction(); 
  }

  addNewRow() {
    
    this.isNewRowCreated = false;
  }

  changeIsCreated() {
    this.transactionService.sharedIsCreatedFunction(this.isNewRowCreated);
  }

  changeAddItemRequestPayload() {
    this.transactionService.sharedAddItemRequestPayloadFunction(this.addItemRequestPayload);
  }


   

}
