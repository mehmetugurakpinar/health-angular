import { Component } from '@angular/core';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.css']
})
export class SearchPatientComponent {
  name = '';
  patients: any[] = [];
  selectedPatient: any = null;

  constructor(private patientService: PatientService) {}

  onSearch(): void {
    this.patientService.searchPatientByName(this.name).subscribe(
      response => {
        this.patients = response.hits.hits.map((hit: any) => hit._source);
      },
      error => {
        console.error('Error searching for patients', error);
      }
    );
  }

  onSelect(patient: any): void {
    this.selectedPatient = { ...patient };
  }

  onUpdate(): void {
    this.patientService.updatePatient(this.selectedPatient).subscribe(
      response => {
        console.log('Patient updated successfully', response);
        alert('Patient updated successfully');
      },
      error => {
        console.error('Error updating patient', error);
      }
    );
  }
}
