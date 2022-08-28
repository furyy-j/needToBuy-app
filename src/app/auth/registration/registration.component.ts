import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { User } from '../../shared/model/model.user';
import { AuthService } from '../../shared/services/auth.service';
import { MY_IDEAL_EMAIL_REGEXP } from '../../shared/patterns';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private userService: AuthService,
    private title: Title,
    private createLocalUser: AuthService
  ) {
    title.setTitle('Регистрация | Family Budget');
  }

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      email: new FormControl(
        null,
        [Validators.required, Validators.pattern(MY_IDEAL_EMAIL_REGEXP)],
        <AsyncValidatorFn>this.forbiddenEmails.bind(this)
      ),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      name: new FormControl(null, [Validators.required]),
      agree: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  onSubmit() {
    const { email, password, name } = this.form.value;
    const user = new User(email, name);

    this.auth.createUserWithEmailAndPassword(email, password).then((userEP) => {
      this.createLocalUser.createUser(user).subscribe();
      console.log('userEmailPass', userEP);
      this.router.navigate(['/login']);
    });
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     if (errorCode === 'auth/email-already-in-use') {
    //         alert('емаил занят');
    //     }
    // })
    console.log(user);
  }

  forbiddenEmails(
    control: FormControl
  ): Promise<{ forbiddenEmail: boolean } | null> {
    return new Promise((resolve) => {
      this.userService.getUsers().subscribe((user: User[]) => {
        if (
          user.filter((user: User) => user.email === control.value).length > 0
        ) {
          resolve({ forbiddenEmail: true });
        } else {
          resolve(null);
        }
      });
    });
  }
}
