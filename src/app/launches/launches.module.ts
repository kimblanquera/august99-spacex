import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatInputModule} from '@angular/material/input';


import { LaunchesRoutingModule } from './launches-routing.module';
import { LaunchesComponent } from './launches.component';

import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from '../spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LaunchesComponent, SpinnerComponent],
  imports: [
    CommonModule,
    LaunchesRoutingModule,
    HttpClientModule,
    MatTableModule,
    ScrollingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LaunchesModule { }
