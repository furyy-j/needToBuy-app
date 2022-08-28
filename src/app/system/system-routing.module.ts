import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SystemComponent} from './system.component';

import {AngularFireAuthGuard} from '@angular/fire/compat/auth-guard';
import {
    redirectLoggedInTo,
    redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import {SidenavComponent} from "./shared/components/sidenav/sidenav.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
    {
        path: '', component: SystemComponent, canActivate: [AngularFireAuthGuard],
        data: {
            authGuardPipe: redirectUnauthorizedToLogin,
        },
        children: [/*{path: 'sidenav', component: SidenavComponent}*/],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SystemRoutingModule {
}
