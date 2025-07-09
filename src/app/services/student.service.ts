import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/teacher.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private apiService: ApiService) { }

  getStudents(): Observable<Student[]> {
    return this.apiService.get<Student[]>('students');
  }

  getStudent(id: number): Observable<Student> {
    return this.apiService.get<Student>(`students/${id}`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.apiService.post<Student>('students', student);
  }

  updateStudent(id: number, student: Student): Observable<any> {
    return this.apiService.put<any>(`students/${id}`, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.apiService.delete<any>(`students/${id}`);
  }
} 