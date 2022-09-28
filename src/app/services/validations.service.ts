import { Injectable } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }


  static emailValidator(control: AbstractControl) {
    if (control.value != null) {
      if (control.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return null;
      }
      else if (control.value == '') {
        return { 'email': true };
      }
      else {
        return { 'pattern': true };
      }
    }
    else {
      return null;
    }
  }



  static passwordValidator(control: AbstractControl) {

    if (control.value.match(/.{6,100}$/)) {
      return null;
    } else if (control.value == '') {
      return { 'reqpassword': true };
    }
    else {
      return { 'password': true };
    }
  }

}
