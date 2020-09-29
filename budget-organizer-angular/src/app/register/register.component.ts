import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { RegisterRequestPayload } from './register-request.payload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerRequestPayload: RegisterRequestPayload;
  registerForm: FormGroup;

  constructor(private authService : AuthService, private router : Router, private toastr : ToastrService) {
    this.registerRequestPayload = {
      email : '',
      initialBudget : '',
      firstName : '',
      lastName : '',
      password : '',
      confirmedPassword : ''
    }
   }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      initialBudget: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9][0-9])?$")]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmedPassword: new FormControl('', Validators.required)
    });
  }

  register() {
    this.registerRequestPayload.email = this.registerForm.get('email').value;
    this.registerRequestPayload.initialBudget = this.registerForm.get('initialBudget').value;
    this.registerRequestPayload.firstName = this.registerForm.get('firstName').value;
    this.registerRequestPayload.lastName = this.registerForm.get('lastName').value;
    this.registerRequestPayload.password = this.registerForm.get('password').value;
    this.registerRequestPayload.confirmedPassword = this.registerForm.get('confirmedPassword').value;
    
    this.authService
        .register(this.registerRequestPayload)
        .subscribe(data => {
          if(data !== null) {
            this.toastr.success('You registered Successfully', 'CONFIRMATION');
            this.router.navigate(['/login']);
          } else {
            this.toastr.error('Failed to register, Try again!', 'REGISTRATION ERROR');
          }
        });
  
  }
}
