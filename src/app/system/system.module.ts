import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SystemComponent} from './system.component';
import {SystemRoutingModule} from './system-routing.module';
import {HeaderComponent} from "./shared/components/header/header.component";
import {FooterComponent} from "./shared/components/footer/footer.component";
import {SidenavComponent} from "./shared/components/sidenav/sidenav.component";


@NgModule({
    declarations: [SidenavComponent, SystemComponent, HeaderComponent, FooterComponent],
    imports: [CommonModule, SystemRoutingModule],
})
export class SystemModule {
}
