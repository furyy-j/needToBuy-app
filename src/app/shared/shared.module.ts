import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const modules = [MatCardModule, MatInputModule, MatButtonModule];

@NgModule({
  declarations: [],
  imports: [
    modules,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    //MaterialModule,
    BrowserAnimationsModule,
    MatSliderModule,
  ],
  exports: [modules, ReactiveFormsModule, FormsModule, MatSliderModule],
})
export class SharedModule {}
