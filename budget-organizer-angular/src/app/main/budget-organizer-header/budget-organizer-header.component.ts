import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from 'src/app/login/login-response.payload';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-budget-organizer-header',
  templateUrl: './budget-organizer-header.component.html',
  styleUrls: ['./budget-organizer-header.component.css']
})
export class BudgetOrganizerHeaderComponent implements OnInit {

  firstName : string;
  lastName : string;
  loginResponse: LoginResponse;

  constructor(private toastr: ToastrService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.sharedLoginResponseObservable.subscribe(val => this.loginResponse = val);
  }

  logout() {
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