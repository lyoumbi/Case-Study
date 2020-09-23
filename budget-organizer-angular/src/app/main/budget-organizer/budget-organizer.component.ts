import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { TransactionService } from 'src/app/shared/transaction-service.service';

@Component({
  selector: 'app-budget-organizer',
  templateUrl: './budget-organizer.component.html',
  styleUrls: ['./budget-organizer.component.css']
})
export class BudgetOrganizerComponent implements OnInit {
  isUpdate : boolean = false;

  @HostListener('window:load') 
  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  constructor(private router: Router, private transactionService : TransactionService) {
  } 

  ngOnInit(): void {
    this.transactionService.sharedIsUpdateObservable.subscribe(val => this.isUpdate = val);
  }
}
