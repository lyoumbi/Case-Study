import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { TransactionService } from '../shared/transaction-service.service';
import { LoginRequestPayload } from './login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;

  constructor(private authService: AuthService, private http: HttpClient,
                private router : Router, private toastr : ToastrService, private transactionService : TransactionService) {
    this.loginRequestPayload = {
      email : '',
      password : ''
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required)
    });
  }


  login() {
    this.loginRequestPayload.email = this.loginForm.get('email').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;
    
    this.authService
        .login(this.loginRequestPayload).subscribe(data => {
                if(data) {
                  this.router.navigateByUrl('/budget-organizer');
                } else {
                  this.toastr.error('Email or Password not valid!', 'LOGIN ERROR');
                }
              });
  }

}
