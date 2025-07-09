import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(private apiService: ApiService) { }

  getTeachers(): Observable<Teacher[]> {
    return this.apiService.get<Teacher[]>('teachers');
  }

  getTeacher(id: number): Observable<Teacher> {
    return this.apiService.get<Teacher>(`teachers/${id}`);
  }

  createTeacher(teacher: Teacher): Observable<Teacher> {
    return this.apiService.post<Teacher>('teachers', teacher);
  }

  updateTeacher(id: number, teacher: Teacher): Observable<any> {
    return this.apiService.put<any>(`teachers/${id}`, teacher);
  }

  deleteTeacher(id: number): Observable<any> {
    return this.apiService.delete<any>(`teachers/${id}`);
  }
} 