import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ClassLectureService } from '../../../services/class-lecture.service';
import { ClassLecture, Subject, Teacher } from '../../../models/teacher.model';

@Component({
  selector: 'app-class-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="class-form">
      <div class="d-flex justify-between align-center mb-4">
        <h1>{{ isEditMode ? 'Edit Class' : 'Add New Class' }}</h1>
        <a routerLink="/classes" class="btn btn-secondary">Back to List</a>
      </div>
      
      <div class="card">
        <form [formGroup]="classForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="name">Class Name *</label>
            <input 
              type="text" 
              id="name" 
              formControlName="name"
              class="form-control" 
              [class.is-invalid]="isFieldInvalid('name')">
            <div *ngIf="isFieldInvalid('name')" class="text-danger">
              <small *ngIf="classForm.get('name')?.errors?.['required']">Class name is required.</small>
            </div>
          </div>
          
          <div class="form-group">
            <label for="description">Description</label>
            <textarea 
              id="description" 
              formControlName="description"
              class="form-control" 
              rows="3"></textarea>
          </div>
          
          <div class="grid grid-2">
            <div class="form-group">
              <label for="subjectId">Subject *</label>
              <select 
                id="subjectId" 
                formControlName="subjectId"
                class="form-control" 
                [class.is-invalid]="isFieldInvalid('subjectId')">
                <option value="">Select a subject</option>
                <option *ngFor="let subject of subjects" [value]="subject.id">
                  {{ subject.name }} ({{ subject.code }})
                </option>
              </select>
              <div *ngIf="isFieldInvalid('subjectId')" class="text-danger">
                <small *ngIf="classForm.get('subjectId')?.errors?.['required']">Subject is required.</small>
              </div>
            </div>
            
            <div class="form-group">
              <label for="teacherId">Teacher *</label>
              <select 
                id="teacherId" 
                formControlName="teacherId"
                class="form-control" 
                [class.is-invalid]="isFieldInvalid('teacherId')">
                <option value="">Select a teacher</option>
                <option *ngFor="let teacher of teachers" [value]="teacher.id">
                  {{ teacher.fullName }} ({{ teacher.department }})
                </option>
              </select>
              <div *ngIf="isFieldInvalid('teacherId')" class="text-danger">
                <small *ngIf="classForm.get('teacherId')?.errors?.['required']">Teacher is required.</small>
              </div>
            </div>
          </div>
          
          <div class="grid grid-2">
            <div class="form-group">
              <label for="startTime">Start Time *</label>
              <input 
                type="datetime-local" 
                id="startTime" 
                formControlName="startTime"
                class="form-control" 
                [class.is-invalid]="isFieldInvalid('startTime')">
              <div *ngIf="isFieldInvalid('startTime')" class="text-danger">
                <small *ngIf="classForm.get('startTime')?.errors?.['required']">Start time is required.</small>
              </div>
            </div>
            
            <div class="form-group">
              <label for="endTime">End Time *</label>
              <input 
                type="datetime-local" 
                id="endTime" 
                formControlName="endTime"
                class="form-control" 
                [class.is-invalid]="isFieldInvalid('endTime')">
              <div *ngIf="isFieldInvalid('endTime')" class="text-danger">
                <small *ngIf="classForm.get('endTime')?.errors?.['required']">End time is required.</small>
              </div>
            </div>
          </div>
          
          <div class="grid grid-2">
            <div class="form-group">
              <label for="room">Room</label>
              <input 
                type="text" 
                id="room" 
                formControlName="room"
                class="form-control">
            </div>
            
            <div class="form-group">
              <label for="maxCapacity">Max Capacity *</label>
              <input 
                type="number" 
                id="maxCapacity" 
                formControlName="maxCapacity"
                class="form-control" 
                [class.is-invalid]="isFieldInvalid('maxCapacity')">
              <div *ngIf="isFieldInvalid('maxCapacity')" class="text-danger">
                <small *ngIf="classForm.get('maxCapacity')?.errors?.['required']">Max capacity is required.</small>
                <small *ngIf="classForm.get('maxCapacity')?.errors?.['min']">Max capacity must be at least 1.</small>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label>
              <input 
                type="checkbox" 
                formControlName="isActive">
              Active Class
            </label>
          </div>
          
          <div class="d-flex gap-2 mt-4">
            <button type="submit" class="btn btn-primary" [disabled]="classForm.invalid">
              {{ isEditMode ? 'Update' : 'Create' }} Class
            </button>
            <a routerLink="/classes" class="btn btn-secondary">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .class-form h1 {
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
  `]
})
export class ClassFormComponent implements OnInit {
  classForm: FormGroup;
  subjects: Subject[] = [];
  teachers: Teacher[] = [];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private classLectureService: ClassLectureService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.classForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      subjectId: ['', [Validators.required]],
      teacherId: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      room: [''],
      maxCapacity: [30, [Validators.required, Validators.min(1)]],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.loadDropdownData();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadClassLecture(+id);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.classForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  loadDropdownData(): void {
    this.classLectureService.getDropdownData().subscribe((data: { subjects: Subject[], teachers: Teacher[] }) => {
      this.subjects = data.subjects;
      this.teachers = data.teachers;
    });
  }

  loadClassLecture(id: number): void {
    this.classLectureService.getClassLecture(id).subscribe(data => {
      const startTime = new Date(data.startTime).toISOString().slice(0, 16);
      const endTime = new Date(data.endTime).toISOString().slice(0, 16);
      
      this.classForm.patchValue({
        name: data.name,
        description: data.description,
        subjectId: data.subjectId,
        teacherId: data.teacherId,
        startTime: startTime,
        endTime: endTime,
        room: data.room,
        maxCapacity: data.maxCapacity,
        isActive: data.isActive
      });
    });
  }

  onSubmit(): void {
    if (this.classForm.valid) {
      const formValue = this.classForm.value;
      const classData: ClassLecture = {
        id: 0,
        name: formValue.name,
        description: formValue.description,
        subjectId: formValue.subjectId,
        teacherId: formValue.teacherId,
        startTime: new Date(formValue.startTime),
        endTime: new Date(formValue.endTime),
        room: formValue.room,
        maxCapacity: formValue.maxCapacity,
        isActive: formValue.isActive,
        createdDate: new Date()
      };

      if (this.isEditMode) {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.classLectureService.updateClassLecture(+id, classData).subscribe(() => {
            this.router.navigate(['/classes']);
          });
        }
      } else {
        this.classLectureService.createClassLecture(classData).subscribe(() => {
          this.router.navigate(['/classes']);
        });
      }
    }
  }
} 