import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { ClassLectureService } from '../../../services/class-lecture.service';
import { EnrollmentService } from '../../../services/enrollment.service';
import { Student, ClassLecture, Enrollment } from '../../../models/teacher.model';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="enrollment-form">
      <div class="d-flex justify-between align-center mb-4">
        <h1>Enroll Students in Class</h1>
        <a routerLink="/enrollments" class="btn btn-secondary">Back to List</a>
      </div>
      
      <div class="card">
        <form [formGroup]="enrollmentForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="classLectureId">Select Class *</label>
            <select 
              id="classLectureId" 
              formControlName="classLectureId"
              class="form-control" 
              [class.is-invalid]="isFieldInvalid('classLectureId')"
              (change)="onClassChange()">
              <option value="">Select a class</option>
              <option *ngFor="let class of classLectures" [value]="class.id">
                {{ class.name }} - {{ class.subject?.name }} ({{ class.teacher?.fullName }})
              </option>
            </select>
            <div *ngIf="isFieldInvalid('classLectureId')" class="text-danger">
              <small *ngIf="enrollmentForm.get('classLectureId')?.errors?.['required']">Class is required.</small>
            </div>
          </div>
          
          <div *ngIf="selectedClass" class="card mb-3">
            <h4>Class Information</h4>
            <p><strong>Name:</strong> {{ selectedClass.name }}</p>
            <p><strong>Subject:</strong> {{ selectedClass.subject?.name }}</p>
            <p><strong>Teacher:</strong> {{ selectedClass.teacher?.fullName }}</p>
            <p><strong>Capacity:</strong> {{ selectedClass.currentEnrollmentCount || 0 }}/{{ selectedClass.maxCapacity }}</p>
            <p><strong>Room:</strong> {{ selectedClass.room || 'TBD' }}</p>
            <p><strong>Time:</strong> {{ selectedClass.startTime | date:'short' }} - {{ selectedClass.endTime | date:'shortTime' }}</p>
          </div>
          
          <div class="form-group">
            <label>Select Students to Enroll</label>
            <div class="student-selection">
              <div *ngFor="let student of availableStudents" class="student-item">
                <label>
                  <input 
                    type="checkbox" 
                    [value]="student.id"
                    (change)="onStudentSelection($event, student.id)">
                  {{ student.fullName }} ({{ student.email }})
                </label>
              </div>
            </div>
          </div>
          
          <div class="d-flex gap-2 mt-4">
            <button type="submit" class="btn btn-primary" [disabled]="enrollmentForm.invalid || selectedStudentIds.length === 0">
              Enroll Selected Students
            </button>
            <a routerLink="/enrollments" class="btn btn-secondary">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .enrollment-form h1 {
      color: #333;
    }
    
    .text-danger {
      color: #dc3545;
      font-size: 0.8rem;
      margin-top: 0.25rem;
    }
    
    .form-control.is-invalid {
      border-color: #dc3545;
    }
    
    .student-selection {
      max-height: 300px;
      overflow-y: auto;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 1rem;
    }
    
    .student-item {
      margin-bottom: 0.5rem;
    }
    
    .student-item label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }
    
    .student-item input[type="checkbox"] {
      margin: 0;
    }
  `]
})
export class EnrollmentFormComponent implements OnInit {
  enrollmentForm: FormGroup;
  students: Student[] = [];
  classLectures: ClassLecture[] = [];
  selectedStudentIds: number[] = [];
  
  get selectedClass(): ClassLecture | undefined {
    const classId = this.enrollmentForm.get('classLectureId')?.value;
    return this.classLectures.find(c => c.id === classId);
  }
  
  get availableStudents(): Student[] {
    if (!this.selectedClass) return this.students;
    
    const enrolledStudentIds = this.selectedClass.enrollments?.map(e => e.studentId) || [];
    return this.students.filter(s => !enrolledStudentIds.includes(s.id));
  }

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private classLectureService: ClassLectureService,
    private enrollmentService: EnrollmentService,
    private router: Router
  ) {
    this.enrollmentForm = this.fb.group({
      classLectureId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.enrollmentForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  loadData(): void {
    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.students = data;
    });
    
    this.classLectureService.getClassLectures().subscribe((data: ClassLecture[]) => {
      this.classLectures = data;
    });
  }

  onClassChange(): void {
    this.selectedStudentIds = [];
  }

  onStudentSelection(event: any, studentId: number): void {
    if (event.target.checked) {
      this.selectedStudentIds.push(studentId);
    } else {
      this.selectedStudentIds = this.selectedStudentIds.filter(id => id !== studentId);
    }
  }

  onSubmit(): void {
    if (this.enrollmentForm.valid && this.selectedStudentIds.length > 0) {
      const request = {
        classLectureId: this.enrollmentForm.get('classLectureId')?.value,
        studentIds: this.selectedStudentIds
      };

      this.enrollmentService.bulkEnroll(request).subscribe((results: any) => {
        const successCount = results.filter((r: any) => r.Success).length;
        const failureCount = results.length - successCount;
        
        if (failureCount > 0) {
          alert(`${successCount} students enrolled successfully. ${failureCount} enrollments failed.`);
        } else {
          alert(`${successCount} students enrolled successfully!`);
        }
        
        this.router.navigate(['/enrollments']);
      });
    } else if (this.selectedStudentIds.length === 0) {
      alert('Please select at least one student to enroll.');
    }
  }
} 