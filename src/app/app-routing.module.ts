import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePatientComponent } from './create-patient/create-patient.component';
import { SearchPatientComponent } from './search-patient/search-patient.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';

const routes: Routes = [
  { path: 'create', component: CreatePatientComponent },
  { path: 'search', component: SearchPatientComponent },
  { path: 'update/:id', component: UpdatePatientComponent },
  { path: '', redirectTo: '/create', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
