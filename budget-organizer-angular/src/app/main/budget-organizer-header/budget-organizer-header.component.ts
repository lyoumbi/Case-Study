import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-budget-organizer-header',
  templateUrl: './budget-organizer-header.component.html',
  styleUrls: ['./budget-organizer-header.component.css']
})
export class BudgetOrganizerHeaderComponent implements OnInit {

  firstName : string;
  lastName : string;
  id : number;

  constructor(private localStorage: LocalStorage, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.localStorage.getItem('loginUserFirstName', {type: 'string'}).subscribe(fn => this.firstName = fn);
    this.localStorage.getItem('loginUserLastName', {type: 'string'}).subscribe(ln => this.lastName = ln);
    this.localStorage.getItem('loginUserId', {type: 'number'}).subscribe(userId => this.id = userId);
  }

  logout() {
    this.localStorage.clear();
    this.toastr.success('Logout Successfully', 'CONFIRMATION');
  }

  menuDisplay() {
    let userMenu = (document.querySelector('.user-menu') as HTMLElement);
        userMenu.classList.toggle('fadeOutUp');
        userMenu.classList.toggle('fadeInDown');
        setTimeout(() => userMenu.style.display = 'block', 500);
  }

  menuClosed() {
    let userMenu = (document.querySelector('.user-menu') as HTMLElement);
        userMenu.classList.toggle('fadeInDown');
        userMenu.classList.toggle('fadeOutUp');
        setTimeout(() => userMenu.style.display = 'none', 500);
    }

}