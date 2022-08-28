import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private title: Title
  ) {
    title.setTitle('Вход | Family Budget');
  }

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    const { email, password } = this.form.value;

    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('reg', user);
        localStorage.setItem('ActiveUserEmail', email);
        this.router.navigate(['/system/sidenav']);
      })
      .catch(function (error) {
        if (error.code === 'auth/wrong-password') {
          alert('Wrong password.');
        }
        if (error.code === 'auth/user-not-found') {
          alert('User not found');
        } else {
          console.log(error.code);
        }
      });
  }
}
