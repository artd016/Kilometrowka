import { Component, OnInit,} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from '../../shared/registration.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  stateCosts: any;
  vehicle_key: any;
  constructor(private route: ActivatedRoute,
              private registrationService: RegistrationService) { }

  ngOnInit() {

    this.stateCosts = this.registrationService.stateCosts;

  }


}
