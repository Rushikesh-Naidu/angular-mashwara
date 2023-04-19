import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  askPhoneNumber: boolean = false;
  loginForm: FormGroup;
  otpVerified:boolean=false;
  constructor(
    private fb : FormBuilder,
    private router: Router
  ){
    this.loginForm = this.fb.group({
      phone: ['',[Validators.required]],
      otp: ['',[Validators.required]]
    })
  }

  ngOnInit():void {
      setTimeout(()=>{
        this.askPhoneNumber = true;
      },2500)
      

  }

  enableGetOtp: boolean = true;
  askOtp: boolean = false;
  phoneInput(){
    let phone = this.loginForm.controls['phone'].value.toString();
    if(phone.length == 10){
      this.enableGetOtp = false;
    }

  }

  getOTP(){
    this.askPhoneNumber = false;
    this.askOtp = true;
  }

  enableVerifyOtp:boolean=true;
  otp:number=0;
  onOtpChange(event:any){
    if(event.length == 4){
      this.otp = event;
      this.enableVerifyOtp = false;
    }
  }

  verifyOtp(){
    this.otpVerified = true;

    setTimeout(() => {
      this.router.navigate(['home']);
    }, 1000);
  }
}
