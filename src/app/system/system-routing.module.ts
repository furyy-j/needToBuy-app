import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireAuthGuard} from '@angular/fire/compat/auth-guard';
import {redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

import {SystemComponent} from './system.component';
import {CoupensComponent} from "./coupens-page/coupens.component";
import {PurchasesComponent} from "./purchases-page/purchases.component";
import {AddProductPageComponent} from "./add-product-page/add-product-page.component";
import {StatisticsPageComponent} from "./statistics-page/statistics-page.component";
import {SettingComponent} from "./setting-page/setting.component";
import {ListItemDetailComponent} from "./purchases-page/list-item-detail/list-item-detail.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);


const routes: Routes = [
    {
        path: '',
        component: SystemComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin,},
        children: [
            {path: '', redirectTo: 'purchases-page', pathMatch: 'full'},
            {path: 'purchases-page', component: PurchasesComponent},
            {path: 'create', component: AddProductPageComponent},
            {path: 'statistics', component: StatisticsPageComponent},
            {path: 'coupens-page', component: CoupensComponent},
            {path: 'settings', component: SettingComponent},
            {path: 'purchases-page/:id', component: ListItemDetailComponent},
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SystemRoutingModule {
}
