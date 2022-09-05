import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireAuthGuard} from '@angular/fire/compat/auth-guard';
import {redirectUnauthorizedTo} from '@angular/fire/auth-guard';

import {SystemComponent} from './system.component';
import {CoupensComponent} from "./coupens-page/coupens.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {AddProductPageComponent} from "./add-product-page/add-product-page.component";
import {StatisticsPageComponent} from "./statistics-page/statistics-page.component";
import {HistoryPageComponent} from "./history-page/history-page.component";
import {SettingComponent} from "./setting-page/setting.component";
import {ListItemDetailComponent} from "./shopping-list/list-item-detail/list-item-detail.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
    {
        path: '',
        component: SystemComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin,},
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'shoplist', component: ShoppingListComponent},
            {path: 'add-products', component: AddProductPageComponent},
            {path: 'statistics', component: StatisticsPageComponent},
            {path: 'coupens-page', component: CoupensComponent},
            {path: 'history', component: HistoryPageComponent},
            {path: 'settings', component: SettingComponent},
            {path: 'shoplist/:id', component: ListItemDetailComponent},

        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SystemRoutingModule {
}
