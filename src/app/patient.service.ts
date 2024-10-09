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

  upsertPatient(patient: any): Observable<any> {
    return this.http.post(`${this.baseUrlUpsert}`, patient);
  }

  searchPatientByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrlGet}`, { params: { q: name } });
  }

  getPatientById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrlGet}/${id}`);
  }
}
