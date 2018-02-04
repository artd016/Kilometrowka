import { Component, OnInit } from '@angular/core';
import {AngularFireList} from 'angularfire2/database';
import {MatTableDataSource} from '@angular/material';

import { RegistrationService } from '../../shared/registration.service';
import { Registration } from '../../shared/registration.model';


@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})

export class RegistrationListComponent implements OnInit {

  displayedColumns = ['data', 'skąd', 'dokąd', 'cel', 'stan licznika początkowy',
                     'stan licznika końcowy', 'akcje'];
  registrationList: Registration[];
  dataSource: MatTableDataSource<Registration>;

  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {
   const registrationToApprove = this.registrationService.getRegistrationToApprove();
   registrationToApprove.snapshotChanges().subscribe(item => {
    this.registrationList = [];
    item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.registrationList.push(y as Registration);
    });

    this.dataSource = new MatTableDataSource<Registration>(this.registrationList);
  });
  }

  onItemClick(reg: Registration) {
    this.registrationService.selectedRegistration = Object.assign({}, reg);
  }

  approveRegistration(reg: Registration): void {
    this.registrationService.insertApprovedRegistration(reg);
  
 }

}