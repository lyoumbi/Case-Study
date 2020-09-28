import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../login/login-response.payload';
import { ChangePasswordPayload } from '../main/change-password/change-password.payload';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private httpClient: HttpClient) { }

  changePassword(id: number, changePasswordPayload: ChangePasswordPayload): Observable<LoginResponse> {
    return this.httpClient.put<LoginResponse>("//localhost:8080/api/user/change-password/" + id, changePasswordPayload);
  }
}
