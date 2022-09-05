import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {Message} from "../../shared/model/message.model";
import {AuthService} from "../../shared/services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    form!: FormGroup;
    message!: Message;

    constructor(
        private auth: AngularFireAuth,
        private authFireBase: AuthService,
        private router: Router,
        private title: Title,
        private route: ActivatedRoute,

    ) {
        title.setTitle('Вход | Family Budget');
    }

    ngOnInit(): void {

        this.message = new Message('danger', '');
        this.route.queryParams
            .subscribe((params: Params) => {
                if (params['nowCanLogin']) {
                    this.showMessage({
                        text: 'Теперь вы можете зайти в систему',
                        type: 'success'
                    });
                } else {
                    if(params['accessDenied']){
                        this.showMessage({
                            text: 'Для работы с системой вам нужно войти',
                            type: 'warning'
                        });
                    }
                }
            })

        this.form = new FormGroup<any>({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
            ]),
        });
    }

     private showMessage(message: Message) {
        this.message = message;
        window.setTimeout(() => {
            this.message.text = '';
        }, 5000)
    }

    onSubmit() {
        const {email, password} = this.form.value;

        this.auth
            .signInWithEmailAndPassword(email, password, )
            .then((user) => {

                console.log('loguID',user.user.email)
                this.router.navigate(['/system']);
            })
            .catch((error)=>{
                if (error.code === 'auth/wrong-password') {
                    this.showMessage({
                        text: 'Пароль не верный',
                        type: 'danger'
                    })
                }
                if (error.code === 'auth/user-not-found') {
                    this.showMessage({
                        text: 'Пользователя не существует',
                        type: 'danger'
                    })
                } else {
                    console.log(error.code);
                }
            });
    }
}
