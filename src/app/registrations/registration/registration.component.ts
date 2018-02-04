import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';

import { RegistrationService } from '../../shared/registration.service';

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

  vehicle_key: any;

  constructor(private registrationService: RegistrationService, private router: Router) { }

  ngOnInit() {
    this.resetForm();
    this.vehicle_key = this.registrationService.vehicle_key;
  }

  onSubmit(form: NgForm) {
    if (form.value.$key === '') {
      this.registrationService.insertRegistration(form.value, this.vehicle_key);
      console.log(form.value.reg_date);
      this.router.navigate(['/summary']);
    } else {
      this.registrationService.updateRegistration(form.value);
    }

    this.resetForm(form);
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }

    this.registrationService.selectedRegistration = {
      $key: '',
      reg_date: '',
      purpose: '',
      fromWhere: '',
      toWhere: '',
      initial_odometer: 0,
      final_odometer: 0
    };
  }

}
