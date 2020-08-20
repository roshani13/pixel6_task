import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder,FormControl } from '@angular/forms';
import { LoanService } from '../services/loan.service';
import { Router } from '@angular/router';

let timerOn = true;

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  title = 'Laon Application Details';
  loanform: FormGroup;  
  public data: any;
  public step: any;


  constructor(public fb: FormBuilder,    private router: Router, public loanservice: LoanService) {
    this.step = 1;
    this.loanform = this.fb.group({
          fullName: ['',Validators.required],
          mobile: ['',[Validators.required,Validators.maxLength(10)]],
          email: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
          panNumber: ['',[Validators.required,Validators.pattern('^([A-Z]){5}([0-9]){4}([A-Z]){1}$')]],
          city: ['',Validators.required],
          otp: ['',Validators.required]
    });
   }
   
  myvalidate(control: FormControl) {
      var reg =/^[a-zA-Z ]*$/;
        let nameExp=control.value;
      if(!nameExp.length){
        return { required: true };
      }
      else if(reg.test(nameExp)==false){
          return { pattern: true }
      }
 }

  ngOnInit() {
  }

  getotp() {
    let formData = this.loanform.getRawValue();
    if (this.step == 1) {
      delete formData.otpNumber;
      this.loanservice.getOtpDetails().then((resp: any) => {
        this.data = resp;
        this.step = 2;
      }, (error) => {
        console.log('error');
      });

    } else {
      delete formData.mobNumber;
      this.loanservice.verifyOtpDetails(formData).then((resp: any) => {
        this.router.navigateByUrl("/home");
      }, (error) => {
        console.log('error');
      });
    }
  }
}

function timer(remaining) {
  var m = Math.floor(remaining / 60);
  var s = remaining % 60;
  
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  document.getElementById('timer').innerHTML = m + ':' + s;
  remaining -= 1;
  
  if(remaining >= 0 && timerOn) {
    setTimeout(function() {
        timer(remaining);
    }, 1000);
    return;
  }

  if(!timerOn) {
    // Do validate stuff here
    return;
  }
  
  // Do timeout stuff here
  alert('Timeout for otp');
}

timer(180);

