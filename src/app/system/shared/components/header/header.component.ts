import {Component, Input, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {User} from "../../../../shared/model/model.user";
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Input() user!: User;

    date: Date = new Date();



    constructor(private auth: AngularFireAuth,
                private router: Router
                ) {
    }

    ngOnInit(): void {


    }

    onLogout() {
        localStorage.clear();
        this.auth.signOut();
        this.router.navigate(['']);
    }

}
