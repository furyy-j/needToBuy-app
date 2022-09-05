import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncValidatorFn, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {Subscription } from "rxjs";

import {User} from '../../shared/model/model.user';
import {AuthService} from '../../shared/services/auth.service';
import {MY_IDEAL_EMAIL_REGEXP} from '../../shared/patterns';


@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {

    sub$!: Subscription;
    form!: FormGroup;

    constructor(
        private auth: AngularFireAuth,
        private router: Router,
        private authService: AuthService,
        private title: Title,
    ) {
        title.setTitle('Регистрация | Family Budget');
    }

    ngOnInit(): void {
        this.form = new FormGroup<any>({
            email: new FormControl(
                null,
                [Validators.required, Validators.pattern(MY_IDEAL_EMAIL_REGEXP)],
                <AsyncValidatorFn><any>this.forbiddenEmails.bind(this)
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
        const {email, password, name} = this.form.value;
        const user = new User(email, name);


        this.auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {

            console.log('reg userID', userCredential.user.uid)
            this.authService.createUser(user, userCredential.user.uid);
            this.router.navigate(['/login'], {
                queryParams: {
                    nowCanLogin: true,
                }
            });
        });
    }

    forbiddenEmails(control: FormControl): Promise<{ forbiddenEmail: boolean } | null> {
        return new Promise((resolve) => {
            this.sub$ = this.authService.getAllUsers().subscribe((user: User[]) => {
                if (
                    user.filter((user: User) => user.email === control.value).length > 0
                ) {
                    resolve({forbiddenEmail: true});
                } else {
                    resolve(null);
                }
            });
        });
    }

    ngOnDestroy() {
        if(this.sub$){this.sub$.unsubscribe()}
    }

}
