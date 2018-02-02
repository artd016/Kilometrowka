import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

import {Registration, Vehicle} from './registration.model';

@Injectable()
export class RegistrationService {

  vehicle_key: any;
  stateCosts: any;
  private year: number;

  registrationList: AngularFireList<any>;
  vehiclesList: AngularFireList<any>;

  selectedRegistration: Registration = new Registration();
  selectedVehicle: Vehicle = new Vehicle();

  constructor(private firebase: AngularFireDatabase) {
    this.year = (new Date()).getFullYear();
   }

  getData() {
    this.registrationList = this.firebase.list('registrations');
    return this.registrationList;
  }

  getRegistrationToApprove() {
    this.registrationList = this.firebase.list(`registrations/${this.year}/forApproval/${this.vehicle_key}`);
    return this.registrationList;
  }

  insertRegistration(registrationValue: Registration, vehicleKey: String) {

    this.registrationList = this.firebase.list(`registrations/${this.year}/forApproval/` + vehicleKey);

    this.registrationList.push(
    {
      date: registrationValue.date,
      purpose: registrationValue.purpose,
      fromWhere: registrationValue.fromWhere,
      toWhere: registrationValue.toWhere,
      initial_odometer: registrationValue.initial_odometer,
      final_odometer: registrationValue.final_odometer
    });
  }

  insertApprovedRegistration(registrationValue: Registration, vehicleKey: String) {

    this.registrationList = this.firebase.list(`registrations/${this.year}/approved/` + vehicleKey);

    this.registrationList.push(
    {
      date: registrationValue.date,
      purpose: registrationValue.purpose,
      initial_odometer: registrationValue.initial_odometer,
      final_odometer: registrationValue.final_odometer
    });
  }

  updateRegistration(registration: Registration) {
    this.registrationList.update(registration.$key, {
      date: registration.date,
      purpose: registration.purpose,
      initial_odometer: registration.initial_odometer,
      final_odometer: registration.final_odometer
    });
  }


  getVehicles() {
    console.log('getVehicles');
    this.vehiclesList = this.firebase.list('vehicles');
    return this.vehiclesList;
  }

  insertVehicle(vehicle: Vehicle) {
    this.vehiclesList.push({
      brand: vehicle.brand,
      model: vehicle.model,
      stateCosts: 0
    });
  }

}
