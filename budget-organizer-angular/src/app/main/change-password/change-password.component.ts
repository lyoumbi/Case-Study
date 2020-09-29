import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from 'src/app/login/login-response.payload';
import { AuthService } from 'src/app/shared/auth.service';
import { ChangePasswordService } from 'src/app/shared/change-password.service';
import { ChangePasswordPayload } from './change-password.payload';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordPayload: ChangePasswordPayload = {
                                                    currentPassword: '',
                                                    newPassword: '',
                                                    confirmPassword: ''
                                                  };
  changePasswordForm: FormGroup;
  loginResponse: LoginResponse;

  @HostListener('window:load') 
  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  constructor(private toastr: ToastrService, private router: Router, private authService: AuthService, private changePasswordService: ChangePasswordService) { }

  ngOnInit(): void {
    this.authService.sharedLoginResponseObservable.subscribe(val => this.loginResponse = val);
    this.changePasswordForm = new FormGroup({
                                              currentPassword: new FormControl('', Validators.required),
                                              newPassword: new FormControl('', Validators.required),
                                              confirmPassword: new FormControl('', Validators.required)
                                            });
  }

  changePassword(): void{
    this.changePasswordPayload.currentPassword = this.changePasswordForm.get('currentPassword').value;
    this.changePasswordPayload.newPassword = this.changePasswordForm.get('newPassword').value;
    this.changePasswordPayload.confirmPassword = this.changePasswordForm.get('confirmPassword').value;
    
    this.changePasswordService.changePassword(this.loginResponse.id, this.changePasswordPayload)
                              .subscribe(data => {
                                if(data == null) {
                                  this.toastr.error('Password cannot be changed', 'ERROR');
                                } else {
                                  this.toastr.success('Password successfully changed', 'CONFIRMATION');
                                  this.router.navigateByUrl('/login');
                                }
                              });
  }

}
