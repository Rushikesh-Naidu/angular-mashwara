import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { LoginService } from '../login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit{

  createAcc : boolean = false;
  registerForm: FormGroup

  showRePassword: boolean = false;
  hideRePass: boolean = true;
  hidePass: boolean = true;

  constructor(
    private fb : FormBuilder,
    private loader: LoaderService,
    private loginService: LoginService,
    private snack: MatSnackBar,
    private router: Router,
  ){
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rePassword: ['', [Validators.required]],
      email: ['', [Validators.required]],
      age: ['', []],
      gender: ['', []],
      diet: ['', []],
    })
  }

  ngOnInit(): void {
      setTimeout(()=>{
        this.createAcc = true;
      }, 1500)
  }

  rePasswordShow(){
    if(this.registerForm.value.password.length>0){
      this.showRePassword = true;
    } else {
      setTimeout(()=>{
        this.showRePassword = false;
      },300)
    }
  }

  showMes: boolean = false;
  passDontMatch : boolean = true;
  reEnteredPassword(){
    if(this.registerForm.value.rePassword.length>0){
      this.showMes = true;
      if(this.registerForm.value.rePassword == this.registerForm.value.password){
        this.passDontMatch = false;
      } else {
        this.passDontMatch = true;
      }
    } else {
      this.showMes = false;
    }
  }

  invalidEmail : boolean = true;
  validateEmail(){
    if(this.registerForm.value.email.length>0){
      var regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
      if (regex.test(this.registerForm.value.email)) {
        this.invalidEmail = false;
      } else {
        this.invalidEmail = true;
      }
    } else {
      this.invalidEmail = true;
    }
  }

  createAccount(){
    console.log(this.registerForm.value.phone.toString().length);
    
    if(this.registerForm.value.phone.toString().length==10){
      if(!this.passDontMatch){
        if(!this.invalidEmail){
          
          let userCreatePostObj = {
            "name": this.registerForm.value.name,
            "phoneNumber": this.registerForm.value.phone.toString(),
            "password": this.registerForm.value.password,
            "email": this.registerForm.value.email,
            "age": this.registerForm.value.age,
            "gender": this.registerForm.value.gender,
            "diet": this.registerForm.value.diet,
          }

          console.log(userCreatePostObj);

          this.loader.open();
          this.loginService.postUserDetails(userCreatePostObj).subscribe((res)=>{
            this.loader.close();
            localStorage.setItem('custName', res.name);
            localStorage.setItem('custPhone', res.phoneNumber);
            localStorage.setItem('custGender', res.gender);
            localStorage.setItem('custAge', res.age);
            localStorage.setItem('custDiet', res.diet);
            this.router.navigate(['home'])
          },(error)=>{
            this.snack.open("Something Went Wrong..!", "Ok",{
              duration: 4000,
              verticalPosition : 'top'
             })
            this.loader.close();
          })
          

        } else {
          this.snack.open("Invalid email", "Ok",{
            duration: 4000,
            verticalPosition : 'top'
           }) 
        }
      } else {
        this.snack.open("Please validate your password", "Ok",{
          duration: 4000,
          verticalPosition : 'top'
         }) 
      }
    } else {
      this.snack.open("Entered phone number is invalid", "Ok",{
        duration: 4000,
        verticalPosition : 'top'
       }) 
    }
  }

  goToSign(){
    this.router.navigate(['login'])
  }
}
