import { Component } from '@angular/core';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.css']
})
export class SearchPatientComponent {
  name = '';
  patients: any[] = [];
  selectedPatient: any = null;

  constructor(private patientService: PatientService, private router: Router) {}

  onSearch(): void {
    this.patientService.searchPatientByName(this.name).subscribe(
      response => {
        this.patients = response;
      },
      error => {
        alert(error.error);
      }
    );
  }

  onSelect(patient: any): void {
    this.router.navigate(['/update', patient.id], { state: { patient } });
  }

  onUpdate(): void {
    this.patientService.upsertPatient(this.selectedPatient).subscribe(
      response => {
        console.log('Patient updated successfully', response);
        alert('Patient updated successfully');
      },
      error => {
        alert(error.error);
      }
    );
  }
}
