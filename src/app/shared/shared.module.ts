import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatPaginatorModule,
  MatSidenavModule, MatSnackBarModule,
  MatSortModule,
  MatToolbarModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { RouterModule } from '@angular/router';

import { MainNavComponent } from '../core/components/main-nav/main-nav.component';
import { GoBackButtonComponent } from './components/go-back-button/go-back-button.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatSnackBarModule,
    NgPipesModule,
  ],
  declarations: [
    MainNavComponent,
    GoBackButtonComponent
  ],
  exports: [
    MainNavComponent,
    GoBackButtonComponent
  ]

})
export class SharedModule { }
