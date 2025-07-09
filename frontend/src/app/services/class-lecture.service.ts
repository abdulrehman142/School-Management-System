import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassLecture, Subject, Teacher } from '../models/teacher.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ClassLectureService {
  constructor(private apiService: ApiService) { }

  getClassLectures(): Observable<ClassLecture[]> {
    return this.apiService.get<ClassLecture[]>('classlectures');
  }

  getClassLecture(id: number): Observable<ClassLecture> {
    return this.apiService.get<ClassLecture>(`classlectures/${id}`);
  }

  getDropdownData(): Observable<{ subjects: Subject[], teachers: Teacher[] }> {
    return this.apiService.get<{ subjects: Subject[], teachers: Teacher[] }>('classlectures/dropdown-data');
  }

  createClassLecture(classLecture: ClassLecture): Observable<ClassLecture> {
    return this.apiService.post<ClassLecture>('classlectures', classLecture);
  }

  updateClassLecture(id: number, classLecture: ClassLecture): Observable<any> {
    return this.apiService.put<any>(`classlectures/${id}`, classLecture);
  }

  deleteClassLecture(id: number): Observable<any> {
    return this.apiService.delete<any>(`classlectures/${id}`);
  }
} 