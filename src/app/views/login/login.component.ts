import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  askPhoneNumber: boolean = false;
  loginForm: FormGroup;
  otpVerified:boolean=false;
  hidePass: boolean = true;
  constructor(
    private fb : FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private snack: MatSnackBar,
  ){
    this.loginForm = this.fb.group({
      phone: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  ngOnInit():void {
      setTimeout(()=>{
        this.askPhoneNumber = true;
      },2500)
      

  }

  verifyCust(){
    let phoneNum = (this.loginForm.value.phone).toString();
    if(phoneNum.length == 10){
      this.loginService.getCustByPhone(phoneNum).subscribe((custData)=>{
        console.log(custData);
        if(custData.length>0){
          let passWord = custData[0].password;

          if(passWord == this.loginForm.value.password){
            localStorage.setItem('custName', custData[0].name);
            localStorage.setItem('custPhone', custData[0].phoneNumber);
            localStorage.setItem('custGender', custData[0].gender);
            localStorage.setItem('custAge', custData[0].age);
            localStorage.setItem('custDiet', custData[0].diet);
            this.router.navigate(['home'])
          }
        }
      })
    } else {
      this.snack.open("Please Enter Valid Mobile Number","Ok", {
        duration: 4000,
        verticalPosition: "top",
      })
    }
  }

  signUp(){
    window.location.reload();
  }

}
