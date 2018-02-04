import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

import {Registration, Vehicle, Setting} from './registration.model';

@Injectable()
export class RegistrationService {

  vehicle_key: any;
  stateCosts: any;
  setting: Setting;
  private year: number;
  private month: number;

  registrationList: AngularFireList<any>;
  vehiclesList: AngularFireList<any>;
  settingsList: AngularFireList<any>;

  selectedRegistration: Registration = new Registration();
  selectedVehicle: Vehicle = new Vehicle();

  constructor(private firebase: AngularFireDatabase) {
    this.year = (new Date()).getFullYear();
    this.month = (new Date()).getMonth();
   }

  getRatesPerKm() {
    
    this.settingsList = this.firebase.list('settings');
    this.settingsList.snapshotChanges().subscribe((item)=>{

      console.log(item.length);

      if(item.length == 0) {
        this.settingsList.push(
          {
            ratesPerKm: [ 0.5214, 0.8358]
          });
      }
      
      this.setting = Object.assign(item[0].payload.toJSON());
      console.log(this.setting);
      console.log(this.setting.ratesPerKm);


    })
  } 

  getData() {
    this.registrationList = this.firebase.list('registrations');
    return this.registrationList;
  }

  getRegistrationToApprove() {
    this.registrationList = this.firebase.list(`registrations/${this.year}/${this.month}/forApproval/${this.vehicle_key}`);
    return this.registrationList;
  }

  insertRegistration(registrationValue: Registration, vehicleKey: String) {

    this.registrationList = this.firebase.list(`registrations/${this.year}/${this.month}/forApproval/${vehicleKey}`);

    this.registrationList.push(
    {
      reg_date: registrationValue.reg_date.toString(),
      purpose: registrationValue.purpose,
      fromWhere: registrationValue.fromWhere,
      toWhere: registrationValue.toWhere,
      initial_odometer: registrationValue.initial_odometer,
      final_odometer: registrationValue.final_odometer
    });
  }

  insertApprovedRegistration(registrationValue: Registration) {

    this.registrationList = this.firebase.list(`registrations/${this.year}/${this.month}/approved/${this.vehicle_key}`);

    this.registrationList.push(
    {
      reg_date: registrationValue.reg_date.toString(),
      purpose: registrationValue.purpose,
      fromWhere: registrationValue.fromWhere,
      toWhere: registrationValue.toWhere,
      initial_odometer: registrationValue.initial_odometer,
      final_odometer: registrationValue.final_odometer
    });

    // this.selectedVehicle.stateCosts = 
    // (registrationValue.final_odometer - registrationValue.initial_odometer)
    // * this.selectedVehicle
  }

  updateRegistration(registration: Registration) {
    this.registrationList.update(registration.$key, {
      reg_date: registration.reg_date.toString(),
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
  let currentVehicle = this.vehiclesList.push({
      brand: vehicle.brand,
      model: vehicle.model,
      expensePerKm: vehicle.ratePerKm
    });

    let vehicleExtension = this.firebase.list(`vehicles/${currentVehicle.key}/${this.year}/${this.month}`);

    vehicleExtension.push(
    {
      stateCosts: 0
    });
  }

}
