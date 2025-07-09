import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/teacher.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="student-list">
      <div class="d-flex justify-between align-center mb-4">
        <h1>Students</h1>
        <a routerLink="/students/new" class="btn btn-primary">Add New Student</a>
      </div>
      
      <div class="card">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Age</th>
                <th>Enrollment Date</th>
                <th>Classes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let student of students">
                <td>{{ student.fullName }}</td>
                <td>{{ student.email }}</td>
                <td>{{ student.phoneNumber }}</td>
                <td>{{ student.age }}</td>
                <td>{{ student.enrollmentDate | date:'shortDate' }}</td>
                <td>{{ student.enrollments?.length || 0 }}</td>
                <td>
                  <div class="d-flex gap-1">
                    <a [routerLink]="['/students', student.id]" class="btn btn-secondary btn-sm">Edit</a>
                    <button (click)="deleteStudent(student.id)" class="btn btn-danger btn-sm">Delete</button>
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
    .student-list h1 {
      color: #333;
    }
    
    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.8rem;
    }
  `]
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.loadStudents();
      });
    }
  }
} 