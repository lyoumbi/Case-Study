import {  AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { TransactionService } from 'src/app/shared/transaction-service.service';

@Component({
  selector: 'app-budget-organizer',
  templateUrl: './budget-organizer.component.html',
  styleUrls: ['./budget-organizer.component.css']
})
export class BudgetOrganizerComponent implements OnInit, AfterViewInit {

  isLogin : boolean;
  isUpdate : boolean = false;

  constructor(private authService: AuthService, private router: Router, private transactionService : TransactionService) {
    this.authService.sharedIsLoginObservable.subscribe(val => this.isLogin = val);
    if(this.isLogin) {
      this.router.navigateByUrl('/login');
      this.isLogin = false;
      this.changeIsLogin();
    }
  }
  ngAfterViewInit(): void {
    this.isLogin = true;
    this.changeIsLogin();
  }

  ngOnInit(): void {
    this.transactionService.sharedIsUpdateObservable.subscribe(val => this.isUpdate = val);
  }

  changeIsLogin() {
    this.authService.sharedIsLoginFunction(this.isLogin);
  }

  changeIsUpdate() {
    this.transactionService.shareIsUpdateFunction(this.isUpdate);
  }
}
