import {Component, HostBinding, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {fadeStateTrigger} from "../shared/animations/fide.animation";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [fadeStateTrigger]
})
export class AuthComponent implements OnInit {

  @HostBinding('@fade') a = true;
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/login']);
  }
}
