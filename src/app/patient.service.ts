import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrlUpsert = 'http://localhost:8082/patients';
  private baseUrlGet = 'http://localhost:8081/search';

  constructor(private http: HttpClient) {}

  createPatient(patient: any): Observable<any> {
    return this.http.post(`${this.baseUrlUpsert}/create`, patient);
  }

  searchPatientByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrlGet}/search`, { params: { q: name } });
  }

  updatePatient(patient: any): Observable<any> {
    return this.http.put(`${this.baseUrlUpsert}/update`, patient);
  }

  getPatientById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrlGet}/${id}`);
  }
}
