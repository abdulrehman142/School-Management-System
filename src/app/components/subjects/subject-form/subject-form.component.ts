import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '../../../services/subject.service';
import { Subject } from '../../../models/teacher.model';

@Component({
  selector: 'app-subject-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="subject-form">
      <div class="d-flex justify-between align-center mb-4">
        <h1>{{ isEditMode ? 'Edit Subject' : 'Add New Subject' }}</h1>
        <a routerLink="/subjects" class="btn btn-secondary">Back to List</a>
      </div>
      
      <div class="card">
        <form [formGroup]="subjectForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="name">Subject Name *</label>
            <input 
              type="text" 
              id="name" 
              formControlName="name"
              class="form-control" 
              [class.is-invalid]="isFieldInvalid('name')">
            <div *ngIf="isFieldInvalid('name')" class="text-danger">
              <small *ngIf="subjectForm.get('name')?.errors?.['required']">Subject name is required.</small>
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
              <label for="code">Subject Code</label>
              <input 
                type="text" 
                id="code" 
                formControlName="code"
                class="form-control">
            </div>
            
            <div class="form-group">
              <label for="credits">Credits *</label>
              <input 
                type="number" 
                id="credits" 
                formControlName="credits"
                class="form-control" 
                [class.is-invalid]="isFieldInvalid('credits')">
              <div *ngIf="isFieldInvalid('credits')" class="text-danger">
                <small *ngIf="subjectForm.get('credits')?.errors?.['required']">Credits are required.</small>
                <small *ngIf="subjectForm.get('credits')?.errors?.['min']">Credits must be at least 1.</small>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="department">Department</label>
            <input 
              type="text" 
              id="department" 
              formControlName="department"
              class="form-control">
          </div>
          
          <div class="d-flex gap-2 mt-4">
            <button type="submit" class="btn btn-primary" [disabled]="subjectForm.invalid">
              {{ isEditMode ? 'Update' : 'Create' }} Subject
            </button>
            <a routerLink="/subjects" class="btn btn-secondary">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .subject-form h1 {
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
export class SubjectFormComponent implements OnInit {
  subjectForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subjectForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      code: [''],
      credits: [3, [Validators.required, Validators.min(1)]],
      department: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadSubject(+id);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.subjectForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  loadSubject(id: number): void {
    this.subjectService.getSubject(id).subscribe(data => {
      this.subjectForm.patchValue({
        name: data.name,
        description: data.description,
        code: data.code,
        credits: data.credits,
        department: data.department
      });
    });
  }

  onSubmit(): void {
    if (this.subjectForm.valid) {
      const subjectData: Subject = {
        id: 0,
        ...this.subjectForm.value
      };

      if (this.isEditMode) {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.subjectService.updateSubject(+id, subjectData).subscribe(() => {
            this.router.navigate(['/subjects']);
          });
        }
      } else {
        this.subjectService.createSubject(subjectData).subscribe(() => {
          this.router.navigate(['/subjects']);
        });
      }
    }
  }
} 