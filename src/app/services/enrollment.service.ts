import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment, Student, BulkEnrollmentRequest } from '../models/teacher.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  constructor(private apiService: ApiService) { }

  getEnrollments(): Observable<Enrollment[]> {
    return this.apiService.get<Enrollment[]>('enrollments');
  }

  getEnrollment(id: number): Observable<Enrollment> {
    return this.apiService.get<Enrollment>(`enrollments/${id}`);
  }

  getStudentEnrollments(studentId: number): Observable<Enrollment[]> {
    return this.apiService.get<Enrollment[]>(`enrollments/student/${studentId}`);
  }

  getClassEnrollments(classLectureId: number): Observable<Enrollment[]> {
    return this.apiService.get<Enrollment[]>(`enrollments/class/${classLectureId}`);
  }

  createEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.apiService.post<Enrollment>('enrollments', enrollment);
  }

  updateEnrollment(id: number, enrollment: Enrollment): Observable<any> {
    return this.apiService.put<any>(`enrollments/${id}`, enrollment);
  }

  deleteEnrollment(id: number): Observable<any> {
    return this.apiService.delete<any>(`enrollments/${id}`);
  }

  bulkEnroll(request: BulkEnrollmentRequest): Observable<any> {
    return this.apiService.post<any>('enrollments/bulk-enroll', request);
  }
} 