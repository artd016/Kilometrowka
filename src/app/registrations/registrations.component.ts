import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { RegistrationService } from '../shared/registration.service';
import { Registration, Vehicle } from '../shared/registration.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css'],
  providers: [RegistrationService]
})
export class RegistrationsComponent implements OnInit {

  private _selected: String;

  get selected(): String {
    return this._selected;
}

set selected(value: String) {
   // if (value === undefined) throw 'Please supply time interval';
    this._selected = value;
    console.log(value);

    const vehicle = this.vehiclesList.reduce(x => x.$key === value);

    this.registrationService.stateCosts = vehicle.stateCosts;
    this.registrationService.vehicle_key = vehicle.$key;
    this.router.navigate([`/summary`]);
}

  stateCosts: any;
  vehiclesList: any[];

  constructor(private registrationService: RegistrationService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit() {

    const vehicles = this.registrationService.getVehicles();
    vehicles.snapshotChanges().subscribe(item => {
     this.vehiclesList = [];
     item.forEach(element => {
         const y = element.payload.toJSON();
         y['$key'] = element.key;
         this.vehiclesList.push(y);
     });
   });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VehicleDialogComponent, {
      width: '250px',
      data: { /*this.realEstateWebsiteService.selectedRealEstateWebsite*/ }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      console.log(result);

      if (result !== undefined) {
          this.registrationService.insertVehicle(result);
      }
    });
  }

}

@Component({
  selector: 'vehicle-dialog',
  template: `<h1 mat-dialog-title>Dodaj pojazd</h1>
  <mat-dialog-content>
    <mat-form-field>
      <input matInput tabindex="1" placeholder="Marka"
       [(ngModel)]="data.brand" >
    </mat-form-field>

  <mat-form-field>
    <input matInput tabindex="1" placeholder="Model"
    [(ngModel)]="data.model">
  </mat-form-field>
  </mat-dialog-content>

  <div mat-dialog-actions>
    <button mat-button [mat-dialog-close]="data" tabindex="2">
    Ok
    </button>
    <button mat-button (click)="onNoClick()" tabindex="-1">Cancel</button>
  </div>`
})
export class VehicleDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<VehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
