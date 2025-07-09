import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EnrollmentService } from '../../../services/enrollment.service';
import { Enrollment } from '../../../models/teacher.model';

@Component({
  selector: 'app-enrollment-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="enrollment-list">
      <div class="d-flex justify-between align-center mb-4">
        <h1>Enrollments</h1>
        <a routerLink="/enrollments/new" class="btn btn-primary">Enroll Students</a>
      </div>
      
      <div class="card">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Subject</th>
                <th>Teacher</th>
                <th>Enrollment Date</th>
                <th>Grade</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let enrollment of enrollments">
                <td>{{ enrollment.student?.fullName }}</td>
                <td>{{ enrollment.classLecture?.name }}</td>
                <td>{{ enrollment.classLecture?.subject?.name }}</td>
                <td>{{ enrollment.classLecture?.teacher?.fullName }}</td>
                <td>{{ enrollment.enrollmentDate | date:'shortDate' }}</td>
                <td>{{ enrollment.grade || '-' }}</td>
                <td>
                  <span [class]="enrollment.isActive ? 'badge-success' : 'badge-secondary'">
                    {{ enrollment.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td>
                  <div class="d-flex gap-1">
                    <button (click)="deleteEnrollment(enrollment.id)" class="btn btn-danger btn-sm">Remove</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .enrollment-list h1 {
      color: #333;
    }
    
    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.8rem;
    }
    
    .badge-success {
      background-color: #28a745;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
    }
    
    .badge-secondary {
      background-color: #6c757d;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
    }
  `]
})
export class EnrollmentListComponent implements OnInit {
  enrollments: Enrollment[] = [];

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.loadEnrollments();
  }

  loadEnrollments(): void {
    this.enrollmentService.getEnrollments().subscribe(data => {
      this.enrollments = data;
    });
  }

  deleteEnrollment(id: number): void {
    if (confirm('Are you sure you want to remove this enrollment?')) {
      this.enrollmentService.deleteEnrollment(id).subscribe(() => {
        this.loadEnrollments();
      });
    }
  }
} 