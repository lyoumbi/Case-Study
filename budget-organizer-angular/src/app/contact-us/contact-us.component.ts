import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MailSenderService } from '../shared/mail-sender.service';
import { ContactRequest } from './contact-us-request.payload';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactForm : FormGroup;
  contactRequest : ContactRequest;

  constructor(private mailSender: MailSenderService, private toastr: ToastrService) { 
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
    this.contactRequest.email = this.contactForm.get('email').value;
    this.contactRequest.subject = this.contactForm.get('subject').value;
    this.contactRequest.message = this.contactForm.get('message').value;
    this.mailSender.sendMail(this.contactRequest).subscribe(data => {
      if(data) {
        this.toastr.success('Email successfully sent.', 'CONFIRMATION');
      } else {
        this.toastr.error('Mail not send!', 'ERROR');
      }
    });
  }

}
