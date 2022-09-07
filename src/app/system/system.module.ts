import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";

import {SystemComponent} from './system.component';
import {SystemRoutingModule} from './system-routing.module';
import {HeaderComponent} from "./shared/components/header/header.component";
import {FooterComponent} from "./shared/components/footer/footer.component";
import {SidenavComponent} from "./shared/components/sidenav/sidenav.component";
import {BodyComponent} from './shared/components/body/body.component';
import {CoupensComponent} from './coupens-page/coupens.component';
import {PurchasesComponent} from './purchases-page/purchases.component';
import {AddProductPageComponent} from './add-product-page/add-product-page.component';
import {StatisticsPageComponent} from './statistics-page/statistics-page.component';
import {SettingComponent} from './setting-page/setting.component';
import {DropdownDirective} from './shared/directives/dropdown.directive';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { ListItemDetailComponent } from './purchases-page/list-item-detail/list-item-detail.component';
import { MomentPipe } from './shared/pipes/moment.pipe';
import { AlertComponent } from './shared/components/alert/alert.component';


@NgModule({
    declarations: [
        SidenavComponent,
        SystemComponent,
        HeaderComponent,
        FooterComponent,
        BodyComponent,
        CoupensComponent,
        PurchasesComponent,
        AddProductPageComponent,
        StatisticsPageComponent,
        SettingComponent,
        DropdownDirective,
        FilterPipe,
        ListItemDetailComponent,
        MomentPipe,
        AlertComponent],
    imports: [
        CommonModule,
        SystemRoutingModule,
        FormsModule,
    ],
})
export class SystemModule {
}
