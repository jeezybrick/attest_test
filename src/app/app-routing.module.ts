import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactsListExistsGuard } from './shared/guards/auth-guard.service';
import { ShellComponent } from './core/components/shell/shell.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    data: { state: 'shell'},
    children: [
      {path: '', redirectTo: 'contacts', pathMatch: 'full'},
      {
        path: 'contacts',
        loadChildren: './pages/contacts/contacts.module#ContactsModule'
      }
    ]
  },
  {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: false
    })],
  exports: [RouterModule],
  providers: [
    ContactsListExistsGuard
  ]
})
export class AppRoutingModule {
}
