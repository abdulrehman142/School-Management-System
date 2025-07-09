import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/teacher.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="student-form">
      <div class="d-flex justify-between align-center mb-4">
        <h1>{{ isEditMode ? 'Edit Student' : 'Add New Student' }}</h1>
        <a routerLink="/students" class="btn btn-secondary">Back to List</a>
      </div>
      <div class="card">
        <form [formGroup]="studentForm" (ngSubmit)="onSubmit()">
          <div class="grid grid-2">
            <div class="form-group">
              <label for="firstName">First Name *</label>
              <input type="text" id="firstName" formControlName="firstName" class="form-control">
              <div *ngIf="studentForm.get('firstName')?.invalid && studentForm.get('firstName')?.touched" class="text-danger">
                <small *ngIf="studentForm.get('firstName')?.errors?.['required']">First name is required.</small>
              </div>
            </div>
            <div class="form-group">
              <label for="lastName">Last Name *</label>
              <input type="text" id="lastName" formControlName="lastName" class="form-control">
              <div *ngIf="studentForm.get('lastName')?.invalid && studentForm.get('lastName')?.touched" class="text-danger">
                <small *ngIf="studentForm.get('lastName')?.errors?.['required']">Last name is required.</small>
              </div>
            </div>
          </div>
          <div class="grid grid-2">
            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" formControlName="email" class="form-control">
              <div *ngIf="studentForm.get('email')?.invalid && studentForm.get('email')?.touched" class="text-danger">
                <small *ngIf="studentForm.get('email')?.errors?.['required']">Email is required.</small>
                <small *ngIf="studentForm.get('email')?.errors?.['email']">Please enter a valid email.</small>
              </div>
            </div>
            <div class="form-group">
              <label for="phoneNumber">Phone Number *</label>
              <input type="tel" id="phoneNumber" formControlName="phoneNumber" class="form-control">
              <div *ngIf="studentForm.get('phoneNumber')?.invalid && studentForm.get('phoneNumber')?.touched" class="text-danger">
                <small *ngIf="studentForm.get('phoneNumber')?.errors?.['required']">Phone number is required.</small>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="dateOfBirth">Date of Birth *</label>
            <input type="date" id="dateOfBirth" formControlName="dateOfBirth" class="form-control">
            <div *ngIf="studentForm.get('dateOfBirth')?.invalid && studentForm.get('dateOfBirth')?.touched" class="text-danger">
              <small *ngIf="studentForm.get('dateOfBirth')?.errors?.['required']">Date of birth is required.</small>
            </div>
          </div>
          <div class="form-group">
            <label for="address">Address</label>
            <textarea id="address" formControlName="address" class="form-control" rows="3"></textarea>
          </div>
          <div class="d-flex gap-2 mt-4">
            <button type="submit" class="btn btn-primary" [disabled]="studentForm.invalid">
              {{ isEditMode ? 'Update' : 'Create' }} Student
            </button>
            <a routerLink="/students" class="btn btn-secondary">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .student-form h1 { color: #333; }
    .text-danger { color: #dc3545; font-size: 0.8rem; margin-top: 0.25rem; }
    .form-control.ng-invalid.ng-touched { border-color: #dc3545; }
  `]
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  isEditMode = false;
  studentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: ['']
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.studentId = +id;
      this.loadStudent(this.studentId);
    }
  }

  loadStudent(id: number): void {
    this.studentService.getStudent(id).subscribe(data => {
      let dateOfBirth = '';
      if (data.dateOfBirth) {
        const date = new Date(data.dateOfBirth);
        dateOfBirth = date.toISOString().split('T')[0];
      }
      
      let enrollmentDate = '';
      if (data.enrollmentDate) {
        const date = new Date(data.enrollmentDate);
        enrollmentDate = date.toISOString().split('T')[0];
      }
      
      this.studentForm.patchValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        dateOfBirth: dateOfBirth,
        address: data.address,
        enrollmentDate: enrollmentDate
      });
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) return;
    const student: Student = { ...this.studentForm.value, id: this.studentId ?? 0, enrollmentDate: new Date() };
    if (this.isEditMode) {
      this.studentService.updateStudent(student.id, student).subscribe(() => {
        this.router.navigate(['/students']);
      });
    } else {
      this.studentService.createStudent(student).subscribe(() => {
        this.router.navigate(['/students']);
      });
    }
  }
} 