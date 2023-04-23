import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

let customerURL = environment.customerURL;


const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  // Get All Customers
  getAllCustomers():Observable<any>{
    return this.http.get(`${customerURL}`)
  }


  // Get Customer By Mobile Number
  getCustByPhone(phone:any):Observable<any>{
    return this.http.get(`${customerURL}custPhone?phoneNumber=${phone}`)
  }

  // Create User
  postUserDetails(body:any):Observable<any>{
    return this.http.post(`${customerURL}`, body)
  }
}