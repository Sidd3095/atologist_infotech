import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import * as CryptoJS from 'crypto-js';


const baseUrlUser = 'https://atologistinfotech.com/api/register.php';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient) { }


  userdetail(user:User){


      //----encryption password--------//
      var passwordEncryption = CryptoJS.SHA3(user.encryptpassword);
      var encryptedRegisterPassword = passwordEncryption.toString(CryptoJS.enc.Base64);


      const reqData = {
        firstname:user.firstname ,
        lastname:user.lastname,
        email:user.email,
        encryptpassword: user.encryptpassword,
        mobile: user.mobile_no,
        dob: user.dob
      }


         //--- for cors error we need to pass headers----///
         let headers = new HttpHeaders();
         headers.set('Access-Control-Allow-Origin', '*');
         headers.set('Content-Type', 'application/json');
         headers.set('Accept','application/json',)
    return this.http.post(`${baseUrlUser}`,{headers:headers},{params:reqData})

  }
}
