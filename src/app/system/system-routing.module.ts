import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireAuthGuard} from '@angular/fire/compat/auth-guard';
import {redirectUnauthorizedTo} from '@angular/fire/auth-guard';

import {SystemComponent} from './system.component';
import {CardsComponent} from "./cards-page/cards.component";
import {PurchasesComponent} from "./purchases-page/purchases.component";
import {CreatePageComponent} from "./create-page/create-page.component";
import {StatisticsPageComponent} from "./statistics-page/statistics-page.component";
import {ListItemDetailComponent} from "./purchases-page/list-item-detail/list-item-detail.component";
import {AboutComponent} from "./about-page/about.component";
import {OpenCardComponent} from "./cards-page/open-card/open-card.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);


const routes: Routes = [
    {
        path: '',
        component: SystemComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin,},
        children: [
            {path: '', redirectTo: 'purchases', pathMatch: 'full'},
            {path: 'purchases', component: PurchasesComponent},
            {path: 'create', component: CreatePageComponent},
            {path: 'statistics', component: StatisticsPageComponent},
            {path: 'cards', component: CardsComponent},
            {path: 'about', component: AboutComponent},
            {path: 'purchases/:id', component: ListItemDetailComponent},
            {path: 'cards/:id', component: OpenCardComponent},
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SystemRoutingModule {
}
