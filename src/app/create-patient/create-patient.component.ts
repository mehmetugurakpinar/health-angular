import { Component } from '@angular/core';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent {
  patient = {
    given: '',
    family: '',
    birthDate: '',
    phoneNo: '',
    gender: ''
  };

  constructor(private patientService: PatientService,
    private router: Router) {}

  onSubmit(): void {
    this.patientService.upsertPatient(this.patient).subscribe(
      (response: any) => {
        const createdPatientId = response.id;
        this.router.navigate(['/update', createdPatientId], { state: { fromCreate: true } });
      },
      error => {
        console.error('Error creating patient', error.error);
      }
    );
  }
}
