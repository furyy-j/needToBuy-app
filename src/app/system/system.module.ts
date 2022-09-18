import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxBarcodeModule} from "ngx-barcode";

import {SystemComponent} from './system.component';
import {SystemRoutingModule} from './system-routing.module';
import {HeaderComponent} from "./shared/components/header/header.component";
import {FooterComponent} from "./shared/components/footer/footer.component";
import {SidenavComponent} from "./shared/components/sidenav/sidenav.component";
import {BodyComponent} from './shared/components/body/body.component';
import {CardsComponent} from './cards-page/cards.component';
import {PurchasesComponent} from './purchases-page/purchases.component';
import {CreatePageComponent} from './create-page/create-page.component';
import {StatisticsPageComponent} from './statistics-page/statistics-page.component';
import {DropdownDirective} from './shared/directives/dropdown.directive';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { ListItemDetailComponent } from './purchases-page/list-item-detail/list-item-detail.component';
import { MomentPipe } from './shared/pipes/moment.pipe';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AboutComponent } from './about-page/about.component';
import { ModalComponent } from './cards-page/modal/modal.component';
import {LoaderComponent} from "./shared/components/loader/loader.component";
import { OpenCardComponent } from './cards-page/open-card/open-card.component';



@NgModule({
    declarations: [
        SidenavComponent,
        SystemComponent,
        HeaderComponent,
        FooterComponent,
        BodyComponent,
        CardsComponent,
        PurchasesComponent,
        CreatePageComponent,
        StatisticsPageComponent,
        DropdownDirective,
        FilterPipe,
        ListItemDetailComponent,
        MomentPipe,
        AlertComponent,
        AboutComponent,
        ModalComponent,
        LoaderComponent,
        OpenCardComponent
        ],
    imports: [
        CommonModule,
        SystemRoutingModule,
        FormsModule,
        NgxBarcodeModule,
        ReactiveFormsModule,
    ],
    exports:[LoaderComponent]
})
export class SystemModule {
}
