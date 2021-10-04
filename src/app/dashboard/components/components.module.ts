import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DashboardHeaderComponent],
  exports:[DashboardHeaderComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule
  ]
})
export class ComponentsModule { }
