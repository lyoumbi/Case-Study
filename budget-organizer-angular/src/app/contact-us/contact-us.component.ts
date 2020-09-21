import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactRequest } from './contact-us-request.payload';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactForm : FormGroup;
  contactRequest : ContactRequest;

  constructor(HttpClient : HttpClient) { 
    this.contactRequest = {
      email : '',
    subject : '',
    message : ''
    }
    
  }

  ngOnInit(): void {
    this.contactForm = new FormGroup(
      {email : new FormControl('', [Validators.email, Validators.required]),
      subject : new FormControl('', Validators.required),
      message : new FormControl('', Validators.required)});
  }

  sendEmail() {
    
  }

}
