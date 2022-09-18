import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss']
})
export class StatisticsPageComponent implements OnInit {

  constructor(private title:Title) {
    title.setTitle('Statistics | NeedToBuy');
  }

  ngOnInit(): void {
  }

}
