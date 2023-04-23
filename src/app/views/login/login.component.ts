import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from './login.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
    private loader : LoaderService,
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
      if(phoneNum.length == 10 && this.loginForm.value.password.length>0){
      this.loader.open();
      this.loginService.getCustByPhone(phoneNum).subscribe((custData)=>{
        this.loader.close();
        if(custData.length>0){
          let passWord = custData[0].password;

          if(this.loginForm.value.password.length>0){

            if(passWord == this.loginForm.value.password){
              this.router.navigate(['/home'])
              localStorage.setItem('custName', custData[0].name);
              localStorage.setItem('custPhone', custData[0].phoneNumber);
              localStorage.setItem('custGender', custData[0].gender);
              localStorage.setItem('custAge', custData[0].age);
              localStorage.setItem('custDiet', custData[0].diet);
            } else {
              this.snack.open("Incorrect Password!", "Ok",{
                duration: 4000,
                verticalPosition : 'top'
               }) 
            }
          } else {
            this.snack.open("Please enter the password", "Ok",{
              duration: 4000,
              verticalPosition : 'top'
             }) 
          }
        } else {
           this.snack.open("This number doesn't exist! Check the number again or create a new account....!", "Ok",{
            duration: 4000,
            verticalPosition : 'top'
           })  
        }
      },(error)=>{
        this.loader.close();
      })
    } else {
      this.snack.open("Please Enter Valid Mobile Number and Password","Ok", {
        duration: 4000,
        verticalPosition: "top",
      })
    }
  }

  signUp(){
    this.router.navigate(['register-user'])
  }

}