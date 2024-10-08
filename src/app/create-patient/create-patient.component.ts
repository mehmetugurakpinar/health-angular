import { Component } from '@angular/core';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent {
  patient = {
    name: '',
    surname: '',
    birthDate: '',
    phoneNo: ''
  };

  constructor(private patientService: PatientService) {}

  onSubmit(): void {
    this.patientService.createPatient(this.patient).subscribe(
      response => {
        console.log('Patient saved successfully', response);
        alert('Patient saved successfully');
      },
      error => {
        console.error('Error saving patient', error);
      }
    );
  }
}
