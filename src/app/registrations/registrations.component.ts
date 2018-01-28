import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { RegistrationService } from '../shared/registration.service';
import { Registration } from '../shared/registration.model';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css'],
  providers: [RegistrationService]
})
export class RegistrationsComponent implements OnInit {

  selected: string;

  vehiclesList : any[];

  constructor(private registrationService : RegistrationService,
              public dialog: MatDialog) { }

  ngOnInit() {

    var x = this.registrationService.getVehicles();
    x.snapshotChanges().subscribe(item =>
   {
     this.vehiclesList = [];
     item.forEach(element =>{
         var y = element.payload.toJSON();
         y["$key"] = element.key;
         this.vehiclesList.push(y);
     });
   });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(VehicleDialogComponent, {
      width: '250px',
      data:{ /*this.realEstateWebsiteService.selectedRealEstateWebsite*/ }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      console.log(result);

      if(result != undefined)
      {
          this.registrationService.insertVehicle(result);
      }
      //console.log(result.url);
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
