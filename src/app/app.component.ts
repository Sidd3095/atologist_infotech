import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationsService } from './services/validations.service'
import { UserserviceService } from './services/userservice.service';
import { HttpClient} from '@angular/common/http';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   form!: FormGroup;
  submitted = false;
  alert:any;
  successmsg:any;


  constructor(private formBuilder: FormBuilder,
    private Userservice: UserserviceService) { }

  ngOnInit() {

    //------ validation of form field-----//
    this.form = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, ValidationsService.emailValidator]],
      encryptpassword: ['', [Validators.required, ValidationsService.passwordValidator]],
      dob: ['', [Validators.required]],
      mobile_no: ['', [Validators.required, Validators.pattern("(0|91)?[7-9][0-9]{9}")]]

    });
  }

  // convenience getter for easy access to form fields
  get formData() { return this.form.controls; }


  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    else {

     this.Userservice.userdetail(this.form.value) .pipe(first())
      .subscribe( (res: any) => {
      if(res.success  == '1'){
        this.successmsg = 'Registered successfully.'
        setTimeout(() => this.hideAlert(), 3000);
      }
      },error=>{
        this.alert = error ? error : '';
        setTimeout(() =>this.hideAlert(),  3000);

      })

  }
}

  ///------- hide success and error msg--------///
  hideAlert() {
    this.alert = false;
    this.successmsg = false;
  }
}

