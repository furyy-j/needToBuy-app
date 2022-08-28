import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { RulesComponent } from './rules-page/rules.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent,
    AuthComponent,
    RulesComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule, FormsModule],
})
export class AuthModule {}
