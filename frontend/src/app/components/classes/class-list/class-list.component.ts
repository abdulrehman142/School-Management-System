import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClassLectureService } from '../../../services/class-lecture.service';
import { ClassLecture } from '../../../models/teacher.model';

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="class-list">
      <div class="d-flex justify-between align-center mb-4">
        <h1>Classes</h1>
        <a routerLink="/classes/new" class="btn btn-primary">Add New Class</a>
      </div>
      
      <div class="card">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Teacher</th>
                <th>Time</th>
                <th>Room</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let class of classLectures">
                <td>{{ class.name }}</td>
                <td>{{ class.subject?.name }}</td>
                <td>{{ class.teacher?.fullName }}</td>
                <td>{{ class.startTime | date:'shortTime' }} - {{ class.endTime | date:'shortTime' }}</td>
                <td>{{ class.room || '-' }}</td>
                <td>{{ class.currentEnrollmentCount || 0 }}/{{ class.maxCapacity }}</td>
                <td>
                  <span [class]="class.isActive ? 'badge-success' : 'badge-secondary'">
                    {{ class.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td>
                  <div class="d-flex gap-1">
                    <a [routerLink]="['/classes', class.id]" class="btn btn-secondary btn-sm">Edit</a>
                    <button (click)="deleteClass(class.id)" class="btn btn-danger btn-sm">Delete</button>
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
    .class-list h1 {
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
export class ClassListComponent implements OnInit {
  classLectures: ClassLecture[] = [];

  constructor(private classLectureService: ClassLectureService) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.classLectureService.getClassLectures().subscribe(data => {
      this.classLectures = data;
    });
  }

  deleteClass(id: number): void {
    if (confirm('Are you sure you want to delete this class?')) {
      this.classLectureService.deleteClassLecture(id).subscribe(() => {
        this.loadClasses();
      });
    }
  }
} 