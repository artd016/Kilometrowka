import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import { RegistrationService } from '../../shared/registration.service'

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);

  // matcher = new MyErrorStateMatcher();

  constructor(private registrationService : RegistrationService) { }

  ngOnInit() 
  {
    this.resetForm();
  }

  onSubmit(form : NgForm)
  {
    if(form.value.$key == '')
      this.registrationService.insertRegistration(form.value);
    else
    this.registrationService.updateRegistration(form.value);
    this.resetForm(form);
  }

  resetForm(form? : NgForm)
  {
    if(form != null)
      form.reset();
    this.registrationService.selectedRegistration = {
      $key: '',
      date: null,
      purpose: '',
      initial_odometer: 0,
      final_odometer: 0
    }
  }

}
