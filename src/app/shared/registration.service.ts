import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

import {Registration, Vehicle} from './registration.model'

@Injectable()
export class RegistrationService {

  registrationList : AngularFireList<any>;
  vehiclesList : AngularFireList<any>;

  selectedRegistration : Registration = new Registration();
  selectedVehicle: Vehicle = new Vehicle();

  constructor(private firebase : AngularFireDatabase) { }

  getData(){
    this.registrationList = this.firebase.list('registrations');
    return this.registrationList;
  }

  insertRegistration(registration : Registration)
  {
    this.registrationList.push({
      date: registration.date,
      purpose: registration.purpose,
      initial_odometer: registration.initial_odometer,
      final_odometer: registration.final_odometer
    })
  }

  updateRegistration(registration : Registration){
    this.registrationList.update(registration.$key, {
      date: registration.date,
      purpose: registration.purpose,
      initial_odometer: registration.initial_odometer,
      final_odometer: registration.final_odometer
    })
  }


  getVehicles(){
    this.vehiclesList = this.firebase.list('vehicles');
    return this.vehiclesList;
  }

  insertVehicle(vehicle : Vehicle)
  {
    this.vehiclesList.push({
      brand: vehicle.brand,
      model: vehicle.model,
      stateCosts: 0
    })
  }

}
