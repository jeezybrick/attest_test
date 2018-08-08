import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
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

import { GoBackButtonComponent } from './components/go-back-button/go-back-button.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';


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
    MatFormFieldModule,
    MatInputModule,
    NgPipesModule,
  ],
  declarations: [
    MainNavComponent,
    GoBackButtonComponent,
    SearchInputComponent
  ],
  exports: [
    MainNavComponent,
    GoBackButtonComponent,
    SearchInputComponent
  ]

})
export class SharedModule { }
