import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/model/model.user';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { Params } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  user$!: User;

  constructor(private userServise: AuthService) {}

  ngOnInit(): void {
    this.userServise.getUsers().subscribe((user: any) => {
      this.user$ = user.filter(
        (email: User) => email.email == localStorage.getItem('ActiveUserEmail')
      )[0];
      console.log(this.user$);
    });
  }

  getUser() {}
}
