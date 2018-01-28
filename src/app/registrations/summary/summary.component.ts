import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const key = +this.route.snapshot.paramMap.get('key');
    console.log(key);
  }

}
