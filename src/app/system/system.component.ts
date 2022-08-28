import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
})
export class SystemComponent implements OnInit {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {}
  logout() {
    localStorage.clear();
    this.auth.signOut();
    this.router.navigate(['']);
  }
}
