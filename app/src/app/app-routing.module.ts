import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactsComponent } from './contacts/contacts.component';
import { ContactsFormComponent } from './contacts-form/contacts-form.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'new', component: ContactsFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
