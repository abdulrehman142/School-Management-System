import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SubjectService } from '../../../services/subject.service';
import { Subject } from '../../../models/teacher.model';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="subject-list">
      <div class="d-flex justify-between align-center mb-4">
        <h1>Subjects</h1>
        <a routerLink="/subjects/new" class="btn btn-primary">Add New Subject</a>
      </div>
      
      <div class="card">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Credits</th>
                <th>Department</th>
                <th>Classes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let subject of subjects">
                <td>{{ subject.name }}</td>
                <td>{{ subject.code || '-' }}</td>
                <td>{{ subject.credits }}</td>
                <td>{{ subject.department || '-' }}</td>
                <td>{{ subject.classLectures?.length || 0 }}</td>
                <td>
                  <div class="d-flex gap-1">
                    <a [routerLink]="['/subjects', subject.id]" class="btn btn-secondary btn-sm">Edit</a>
                    <button (click)="deleteSubject(subject.id)" class="btn btn-danger btn-sm">Delete</button>
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
    .subject-list h1 {
      color: #333;
    }
    
    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.8rem;
    }
  `]
})
export class SubjectListComponent implements OnInit {
  subjects: Subject[] = [];

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
  }

  deleteSubject(id: number): void {
    if (confirm('Are you sure you want to delete this subject?')) {
      this.subjectService.deleteSubject(id).subscribe(() => {
        this.loadSubjects();
      });
    }
  }
} 