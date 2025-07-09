import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeacherService } from '../../../services/teacher.service';
import { Teacher } from '../../../models/teacher.model';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="fade-in">
      <div class="d-flex justify-between align-center mb-6">
        <div>
          <h1 class="text-xl font-bold">Teachers</h1>
          <p class="text-secondary mt-1">Manage all teachers in the school</p>
        </div>
        <a routerLink="/teachers/new" class="btn btn-primary">
          <span>👨‍🏫</span>
          Add New Teacher
        </a>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="d-flex justify-between align-center">
            <h2 class="card-title">Teacher Directory</h2>
            <div class="text-sm text-secondary">{{ teachers.length }} teachers found</div>
          </div>
        </div>
        
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Hire Date</th>
                <th>Classes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let teacher of teachers">
                <td>
                  <div class="d-flex align-center gap-3">
                    <div class="w-10 h-10 bg-primary rounded-full d-flex align-center justify-center text-white font-bold">
                      {{ teacher.firstName.charAt(0) }}{{ teacher.lastName.charAt(0) }}
                    </div>
                    <div>
                      <div class="font-medium">{{ teacher.fullName }}</div>
                      <div class="text-sm text-secondary">ID: {{ teacher.id }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="font-medium">{{ teacher.email }}</div>
                </td>
                <td>
                  <div class="font-medium">{{ teacher.phoneNumber }}</div>
                </td>
                <td>
                  <span class="badge badge-info">{{ teacher.department || 'Not Assigned' }}</span>
                </td>
                <td>
                  <div class="font-medium">{{ teacher.hireDate | date:'MMM dd, yyyy' }}</div>
                  <div class="text-sm text-secondary">{{ getYearsOfService(teacher.hireDate) }} years</div>
                </td>
                <td>
                  <div class="font-medium">{{ teacher.classLectures?.length || 0 }} classes</div>
                </td>
                <td>
                  <div class="d-flex gap-2">
                    <a [routerLink]="['/teachers', teacher.id, 'edit']" class="btn btn-sm btn-secondary">
                      ✏️ Edit
                    </a>
                    <button (click)="deleteTeacher(teacher.id)" class="btn btn-sm btn-danger">
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div *ngIf="teachers.length === 0" class="empty-state">
            <div class="empty-state-icon">👨‍🏫</div>
            <h3 class="font-semibold mb-2">No Teachers Found</h3>
            <p class="text-secondary mb-4">Get started by adding your first teacher to the system.</p>
            <a routerLink="/teachers/new" class="btn btn-primary">Add First Teacher</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .w-10 {
      width: 2.5rem;
    }
    
    .h-10 {
      height: 2.5rem;
    }
    
    .bg-primary {
      background-color: var(--primary-color);
    }
    
    .rounded-full {
      border-radius: 9999px;
    }
    
    .text-white {
      color: white;
    }
  `]
})
export class TeacherListComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe(data => {
      this.teachers = data;
    });
  }

  deleteTeacher(id: number): void {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.teacherService.deleteTeacher(id).subscribe(() => {
        this.loadTeachers();
      });
    }
  }

  getYearsOfService(hireDate: Date): number {
    const today = new Date();
    const hire = new Date(hireDate);
    return Math.floor((today.getTime() - hire.getTime()) / (1000 * 60 * 60 * 24 * 365));
  }
} 