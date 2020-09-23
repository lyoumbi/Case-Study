import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddItemRequestPayload } from '../main/add-item/add-item-resquest.payload';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  isUpdate : boolean = false;
  private sharedIsUpdate = new BehaviorSubject<boolean>(this.isUpdate);
  sharedIsUpdateObservable = this.sharedIsUpdate.asObservable();

  transactionList : Array<AddItemRequestPayload> = [];
  private sharedTransactionList = new BehaviorSubject<Array<AddItemRequestPayload>>(this.transactionList);
  sharedTransactionListObservable = this.sharedTransactionList.asObservable();

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

  constructor(private httpClient: HttpClient) { 
  }

  addTransaction(addItemRequestPayload: AddItemRequestPayload, id: number): Observable<AddItemRequestPayload> {
    return this.httpClient.post<AddItemRequestPayload>('http://localhost:8080/api/transaction/create/' + id, addItemRequestPayload);
  }

  sharedAddItemRequestPayloadFunction(value:AddItemRequestPayload) {
    this.sharedAddItemRequestPayload.next(value);
  }

  getAllTransactions(id : number) : Array<AddItemRequestPayload> {
     this.httpClient.get<Array<AddItemRequestPayload>>('http://localhost:8080/api/transaction/all/' + id )
                    .subscribe(transactions => {this.transactionList = transactions;
                                                this.sharedTransactionListFunction(this.transactionList);
                                              });
    return this.transactionList;
  }

  sharedTransactionListFunction(value : Array<AddItemRequestPayload>) {
    this.sharedTransactionList.next(value);
  }

  shareIsUpdateFunction(value : boolean) {
    this.sharedIsUpdate.next(value);
  }

  deleteTransaction(id : number) : Observable<AddItemRequestPayload> {
    return this.httpClient.delete<AddItemRequestPayload>('http://localhost:8080/api/transaction/' + id);
  }

  getTransaction(id : number) : Observable<AddItemRequestPayload> {
    return this.httpClient.get<AddItemRequestPayload>('http://localhost:8080/api/transaction/' + id);
  }


  updateTransaction(addItemRequestPayload: AddItemRequestPayload, id : number) : Observable<AddItemRequestPayload> {
    return this.httpClient.put<AddItemRequestPayload>('http://localhost:8080/api/transaction/' + id, addItemRequestPayload);
  }

}

