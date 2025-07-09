import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../models/teacher.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(private apiService: ApiService) { }

  getSubjects(): Observable<Subject[]> {
    return this.apiService.get<Subject[]>('subjects');
  }

  getSubject(id: number): Observable<Subject> {
    return this.apiService.get<Subject>(`subjects/${id}`);
  }

  createSubject(subject: Subject): Observable<Subject> {
    return this.apiService.post<Subject>('subjects', subject);
  }

  updateSubject(id: number, subject: Subject): Observable<any> {
    return this.apiService.put<any>(`subjects/${id}`, subject);
  }

  deleteSubject(id: number): Observable<any> {
    return this.apiService.delete<any>(`subjects/${id}`);
  }
} 