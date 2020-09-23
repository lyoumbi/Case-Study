import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactRequest } from '../contact-us/contact-us-request.payload';

@Injectable({
  providedIn: 'root'
})
export class MailSenderService {

  constructor(private httpClient: HttpClient) { }

  sendMail(contactRequestPayload: ContactRequest) : Observable<boolean> {
      return this.httpClient.post<boolean>('//localhost:8080/api/mail/send', contactRequestPayload);
  }
 }
