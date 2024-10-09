import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {
  patient: any = {
    given: '',
    family: '',
    birthDate: '',
    gender: '',
    phoneNo: ''
  };

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');
    if (patientId) {
      this.patientService.getPatientById(patientId).subscribe(
        response => {
          this.patient = response;
          console.log('Patient data fetched', this.patient);
        },
        error => {
          console.error('Error fetching patient data', error);
        }
      );
    }
    const state = history.state;
    if (state && state.patient) {
      this.patient = state.patient;
    } else if ((state && !state.fromCreate) || !state) {
      this.router.navigate(['/search']);
    }
  }

  onUpdate(): void {
    this.patientService.upsertPatient(this.patient).subscribe(
      response => {
        alert("Patient updated successfully");
      },
      error => {
        alert(error.error);
      }
    );
  }

  onBack(): void {
    this.router.navigate(['/search']);
  }
}
