import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddItemRequestPayload } from '../main/add-item/add-item-resquest.payload';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  id : number;
  transactionList : Array<AddItemRequestPayload> = [];
  private sharedIsCreated = new BehaviorSubject<boolean>(false);
  currentValue = this.sharedIsCreated.asObservable();

  addItemRequestPayload : AddItemRequestPayload = {
                                                    id : 0,
                                                    type : '',
                                                    transactionType : '',
                                                    description : '',
                                                    location : '',
                                                    amount : 0,
                                                    date : '',
                                                  };
 private sharedAddItemRequestPayload = new BehaviorSubject<AddItemRequestPayload>(this.addItemRequestPayload);
currentSharedAddItemRequestPayload = this.sharedAddItemRequestPayload.asObservable();

  constructor(private httpClient: HttpClient, private localStorage: LocalStorage) { 
    this.localStorage.getItem('loginUserId', {type: 'number'}).subscribe(userId => this.id = userId);
    setTimeout (() => this.httpClient.get<Array<AddItemRequestPayload>>('http://localhost:8080/api/transaction/all/' + this.id ).subscribe(transactions => {
        this.transactionList = transactions;
      }), 1000);
  }

  addTransaction(addItemRequestPayload: AddItemRequestPayload, id: number): Observable<any> {
    return this.httpClient.post<AddItemRequestPayload>('http://localhost:8080/api/transaction/create/' + id, addItemRequestPayload);
  }


  getAllTransaction(): Array<AddItemRequestPayload> {
    return this.transactionList;
  }

  sharedIsCreatedFunction(value: boolean) {
    this.sharedIsCreated.next(value);
  }

  sharedAddItemRequestPayloadFunction(value:AddItemRequestPayload) {
    this.sharedAddItemRequestPayload.next(value);
  }

}

