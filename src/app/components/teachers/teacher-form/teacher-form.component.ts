import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../../services/teacher.service';
import { Teacher } from '../../../models/teacher.model';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="teacher-form">
      <div class="d-flex justify-between align-center mb-4">
        <h1>{{ isEditMode ? 'Edit Teacher' : 'Add New Teacher' }}</h1>
        <a routerLink="/teachers" class="btn btn-secondary">Back to List</a>
      </div>
      <div class="card">
        <form [formGroup]="teacherForm" (ngSubmit)="onSubmit()">
          <div class="grid grid-2">
            <div class="form-group">
              <label for="firstName">First Name *</label>
              <input type="text" id="firstName" formControlName="firstName" class="form-control">
              <div *ngIf="teacherForm.get('firstName')?.invalid && teacherForm.get('firstName')?.touched" class="text-danger">
                <small *ngIf="teacherForm.get('firstName')?.errors?.['required']">First name is required.</small>
              </div>
            </div>
            <div class="form-group">
              <label for="lastName">Last Name *</label>
              <input type="text" id="lastName" formControlName="lastName" class="form-control">
              <div *ngIf="teacherForm.get('lastName')?.invalid && teacherForm.get('lastName')?.touched" class="text-danger">
                <small *ngIf="teacherForm.get('lastName')?.errors?.['required']">Last name is required.</small>
              </div>
            </div>
          </div>
          <div class="grid grid-2">
            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" formControlName="email" class="form-control">
              <div *ngIf="teacherForm.get('email')?.invalid && teacherForm.get('email')?.touched" class="text-danger">
                <small *ngIf="teacherForm.get('email')?.errors?.['required']">Email is required.</small>
                <small *ngIf="teacherForm.get('email')?.errors?.['email']">Please enter a valid email.</small>
              </div>
            </div>
            <div class="form-group">
              <label for="phoneNumber">Phone Number *</label>
              <input type="tel" id="phoneNumber" formControlName="phoneNumber" class="form-control">
              <div *ngIf="teacherForm.get('phoneNumber')?.invalid && teacherForm.get('phoneNumber')?.touched" class="text-danger">
                <small *ngIf="teacherForm.get('phoneNumber')?.errors?.['required']">Phone number is required.</small>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="department">Department</label>
            <input type="text" id="department" formControlName="department" class="form-control">
          </div>
          <div class="form-group">
            <label for="hireDate">Hire Date *</label>
            <input type="date" id="hireDate" formControlName="hireDate" class="form-control">
            <div *ngIf="teacherForm.get('hireDate')?.invalid && teacherForm.get('hireDate')?.touched" class="text-danger">
              <small *ngIf="teacherForm.get('hireDate')?.errors?.['required']">Hire date is required.</small>
            </div>
          </div>
          <div class="d-flex gap-2 mt-4">
            <button type="submit" class="btn btn-primary" [disabled]="teacherForm.invalid">
              {{ isEditMode ? 'Update' : 'Create' }} Teacher
            </button>
            <a routerLink="/teachers" class="btn btn-secondary">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .teacher-form h1 { color: #333; }
    .text-danger { color: #dc3545; font-size: 0.8rem; margin-top: 0.25rem; }
    .form-control.ng-invalid.ng-touched { border-color: #dc3545; }
  `]
})
export class TeacherFormComponent implements OnInit {
  teacherForm!: FormGroup;
  isEditMode = false;
  teacherId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teacherForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      department: [''],
      hireDate: ['', Validators.required]
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.teacherId = +id;
      this.loadTeacher(this.teacherId);
    }
  }

  loadTeacher(id: number): void {
    this.teacherService.getTeacher(id).subscribe(data => {
      let hireDate = '';
      if (data.hireDate) {
        const date = new Date(data.hireDate);
        hireDate = date.toISOString().split('T')[0];
      }
      
      this.teacherForm.patchValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        department: data.department,
        hireDate: hireDate
      });
    });
  }

  onSubmit(): void {
    if (this.teacherForm.invalid) return;
    const teacher: Teacher = { ...this.teacherForm.value, id: this.teacherId ?? 0 };
    if (this.isEditMode) {
      this.teacherService.updateTeacher(teacher.id, teacher).subscribe(() => {
        this.router.navigate(['/teachers']);
      });
    } else {
      this.teacherService.createTeacher(teacher).subscribe(() => {
        this.router.navigate(['/teachers']);
      });
    }
  }
} 