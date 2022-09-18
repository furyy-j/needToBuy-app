import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import {
  AngularFireDatabase,
  AngularFireDatabaseModule,
} from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {CommonModule, registerLocaleData} from '@angular/common';
import localeRU from '@angular/common/locales/ru-UA';
import { ServiceWorkerModule } from '@angular/service-worker';
registerLocaleData(localeRU);



@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    AngularFireDatabaseModule,
    provideFirestore(() => getFirestore()),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [AngularFireDatabase,{ provide: LOCALE_ID, useValue: 'ru-UA'},],
  bootstrap: [AppComponent],
})
export class AppModule {}
