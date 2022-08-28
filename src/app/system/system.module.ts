import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SystemComponent } from './system.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { SystemRoutingModule } from './system-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [SidenavComponent, SystemComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, SystemRoutingModule],
})
export class SystemModule {}
