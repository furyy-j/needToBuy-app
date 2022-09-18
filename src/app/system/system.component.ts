import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {User} from "../shared/model/model.user";
import {AuthService} from "../shared/services/auth.service";
import {fadeStateTrigger} from "../shared/animations/fide.animation";



interface SideNavToggle {
    screenWidth: number;
    collapsed: boolean;
}

@Component({
    selector: 'app-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.scss'],
    animations: [fadeStateTrigger]
})
export class SystemComponent implements OnInit,OnDestroy {

    @HostBinding('@fade') a = true;

    user!: User;

    isSideNavCollapsed = false;
    screenWidth = 0;

    userSub$!: Subscription;

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.userSub$ = this.authService.getUser().subscribe((user: User) => {
            this.user = user
        })
    }

    onToggleSideNav(data: SideNavToggle): void {
        this.screenWidth = data.screenWidth;
        this.isSideNavCollapsed = data.collapsed;
    }

    ngOnDestroy(){
        if(this.userSub$){this.userSub$.unsubscribe()}
    }

}
