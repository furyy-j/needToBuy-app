import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NotFoundComponent} from './not-found-page/not-found.component';
import {RouterLinkWithHref} from "@angular/router";


@NgModule({
    declarations: [
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterLinkWithHref,
    ],
    exports: [ReactiveFormsModule, FormsModule],
})
export class SharedModule {
}
