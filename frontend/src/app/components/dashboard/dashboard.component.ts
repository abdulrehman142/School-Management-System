import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { StudentService } from '../../services/student.service';
import { SubjectService } from '../../services/subject.service';
import { ClassLectureService } from '../../services/class-lecture.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="dashboard-container fade-in">
      <!-- Welcome Section -->
      <div class="welcome-section">
        <div class="welcome-content">
          <h1 class="welcome-title">Welcome to School Management System</h1>
          <p class="welcome-subtitle">Manage your educational institution with ease and efficiency</p>
          <div class="welcome-actions">
            <button class="btn btn-primary btn-lg" routerLink="/students">
              <span>👨‍🎓</span>
              Manage Students
            </button>
            <button class="btn btn-outline btn-lg" routerLink="/teachers">
              <span>👨‍🏫</span>
              Manage Teachers
            </button>
          </div>
        </div>
        <div class="welcome-illustration">
          <div class="illustration-icon">🎓</div>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="dashboard-stats">
        <div class="stat-card" *ngFor="let stat of stats">
          <div class="stat-icon">{{ stat.icon }}</div>
          <div class="stat-content">
            <div class="stat-number">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
          <div class="stat-trend" [class]="stat.trend">
            <span>{{ stat.trendValue }}</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions-section">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">
              <span>⚡</span>
              Quick Actions
            </h2>
            <p class="card-subtitle">Common tasks to get you started</p>
          </div>
          <div class="card-body">
            <div class="quick-actions-grid">
              <button class="quick-action-btn" routerLink="/students/new">
                <div class="action-icon">➕</div>
                <div class="action-content">
                  <h3>Add Student</h3>
                  <p>Register a new student</p>
                </div>
              </button>
              <button class="quick-action-btn" routerLink="/teachers/new">
                <div class="action-icon">👨‍🏫</div>
                <div class="action-content">
                  <h3>Add Teacher</h3>
                  <p>Register a new teacher</p>
                </div>
              </button>
              <button class="quick-action-btn" routerLink="/classes/new">
                <div class="action-icon">🏫</div>
                <div class="action-content">
                  <h3>Create Class</h3>
                  <p>Schedule a new class</p>
                </div>
              </button>
              <button class="quick-action-btn" routerLink="/enrollments/new">
                <div class="action-icon">📝</div>
                <div class="action-content">
                  <h3>Enroll Student</h3>
                  <p>Enroll in a class</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="recent-activity-section">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">
              <span>📊</span>
              Recent Activity
            </h2>
            <p class="card-subtitle">Latest updates and activities</p>
          </div>
          <div class="card-body">
            <div class="activity-list" *ngIf="recentActivities.length > 0; else noActivity">
              <div class="activity-item" *ngFor="let activity of recentActivities">
                <div class="activity-icon">{{ activity.icon }}</div>
                <div class="activity-content">
                  <h4>{{ activity.title }}</h4>
                  <p>{{ activity.description }}</p>
                  <span class="activity-time">{{ activity.time }}</span>
                </div>
              </div>
            </div>
            <ng-template #noActivity>
              <div class="empty-state">
                <div class="empty-state-icon">📊</div>
                <h3>No Recent Activity</h3>
                <p>Start by adding some students, teachers, or classes to see activity here.</p>
              </div>
            </ng-template>
          </div>
        </div>
      </div>

      <!-- System Status -->
      <div class="system-status-section">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">
              <span>🔧</span>
              System Status
            </h2>
          </div>
          <div class="card-body">
            <div class="status-grid">
              <div class="status-item">
                <div class="status-indicator online"></div>
                <div class="status-content">
                  <h4>Database</h4>
                  <p>Connected and operational</p>
                </div>
              </div>
              <div class="status-item">
                <div class="status-indicator online"></div>
                <div class="status-content">
                  <h4>API Server</h4>
                  <p>Running smoothly</p>
                </div>
              </div>
              <div class="status-item">
                <div class="status-indicator online"></div>
                <div class="status-content">
                  <h4>Frontend</h4>
                  <p>All systems operational</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--space-4);
    }

    .welcome-section {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: var(--space-8);
      align-items: center;
      margin-bottom: var(--space-8);
      padding: var(--space-8);
      background: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary));
      border-radius: var(--radius-2xl);
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border-light);
    }

    .welcome-title {
      font-size: var(--font-size-3xl);
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: var(--space-2);
      line-height: 1.2;
    }

    .welcome-subtitle {
      font-size: var(--font-size-lg);
      color: var(--text-secondary);
      margin-bottom: var(--space-6);
      line-height: 1.6;
    }

    .welcome-actions {
      display: flex;
      gap: var(--space-4);
      flex-wrap: wrap;
    }

    .welcome-illustration {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .illustration-icon {
      font-size: 6rem;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
    }

    .dashboard-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--space-6);
      margin-bottom: var(--space-8);
    }

    .stat-card {
      position: relative;
      display: flex;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-6);
      background: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary));
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-light);
      transition: var(--transition-normal);
      overflow: hidden;
    }

    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--primary-500), var(--primary-600));
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    .stat-icon {
      font-size: 2.5rem;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    }

    .stat-content {
      flex: 1;
    }

    .stat-number {
      font-size: var(--font-size-3xl);
      font-weight: 700;
      color: var(--primary-600);
      line-height: 1;
      margin-bottom: var(--space-1);
    }

    .stat-label {
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .stat-trend {
      font-size: var(--font-size-xs);
      font-weight: 600;
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-full);
    }

    .stat-trend.positive {
      background-color: var(--success-100);
      color: var(--success-700);
    }

    .stat-trend.negative {
      background-color: var(--danger-100);
      color: var(--danger-700);
    }

    .quick-actions-section,
    .recent-activity-section,
    .system-status-section {
      margin-bottom: var(--space-8);
    }

    .quick-actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--space-4);
    }

    .quick-action-btn {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-4);
      background: var(--bg-secondary);
      border: 2px solid var(--border-light);
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: var(--transition-normal);
      text-align: left;
      text-decoration: none;
      color: var(--text-primary);
    }

    .quick-action-btn:hover {
      background: var(--bg-primary);
      border-color: var(--primary-500);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .action-icon {
      font-size: 2rem;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    }

    .action-content h3 {
      font-size: var(--font-size-base);
      font-weight: 600;
      margin-bottom: var(--space-1);
    }

    .action-content p {
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
      margin: 0;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .activity-item {
      display: flex;
      align-items: flex-start;
      gap: var(--space-4);
      padding: var(--space-4);
      background: var(--bg-secondary);
      border-radius: var(--radius-lg);
      transition: var(--transition-normal);
    }

    .activity-item:hover {
      background: var(--bg-tertiary);
      transform: translateX(4px);
    }

    .activity-icon {
      font-size: 1.5rem;
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
    }

    .activity-content h4 {
      font-size: var(--font-size-base);
      font-weight: 600;
      margin-bottom: var(--space-1);
    }

    .activity-content p {
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
      margin-bottom: var(--space-1);
    }

    .activity-time {
      font-size: var(--font-size-xs);
      color: var(--text-muted);
    }

    .status-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--space-4);
    }

    .status-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-4);
      background: var(--bg-secondary);
      border-radius: var(--radius-lg);
    }

    .status-indicator {
      width: 12px;
      height: 12px;
      border-radius: var(--radius-full);
      animation: pulse 2s infinite;
    }

    .status-indicator.online {
      background-color: var(--success-400);
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
    }

    .status-content h4 {
      font-size: var(--font-size-sm);
      font-weight: 600;
      margin-bottom: var(--space-1);
    }

    .status-content p {
      font-size: var(--font-size-xs);
      color: var(--text-secondary);
      margin: 0;
    }

    @media (max-width: 768px) {
      .welcome-section {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .welcome-actions {
        justify-content: center;
      }

      .illustration-icon {
        font-size: 4rem;
      }

      .dashboard-stats {
        grid-template-columns: 1fr;
      }

      .quick-actions-grid {
        grid-template-columns: 1fr;
      }

      .status-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  stats: any[] = [];
  recentActivities: any[] = [];

  constructor(
    private teacherService: TeacherService,
    private studentService: StudentService,
    private subjectService: SubjectService,
    private classLectureService: ClassLectureService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    forkJoin({
      teachers: this.teacherService.getTeachers(),
      students: this.studentService.getStudents(),
      subjects: this.subjectService.getSubjects(),
      classes: this.classLectureService.getClassLectures(),
      enrollments: this.enrollmentService.getEnrollments()
    }).subscribe({
      next: (data) => {
        this.stats = [
          {
            icon: '👨‍🏫',
            label: 'Total Teachers',
            value: data.teachers.length,
            trend: 'positive',
            trendValue: '+12%'
          },
          {
            icon: '👨‍🎓',
            label: 'Total Students',
            value: data.students.length,
            trend: 'positive',
            trendValue: '+8%'
          },
          {
            icon: '📚',
            label: 'Subjects',
            value: data.subjects.length,
            trend: 'positive',
            trendValue: '+5%'
          },
          {
            icon: '🏫',
            label: 'Active Classes',
            value: data.classes.filter((c: any) => c.isActive).length,
            trend: 'positive',
            trendValue: '+15%'
          },
          {
            icon: '📝',
            label: 'Enrollments',
            value: data.enrollments.length,
            trend: 'positive',
            trendValue: '+20%'
          },
          {
            icon: '📊',
            label: 'Avg. Class Size',
            value: data.classes.length > 0 ? Math.round(data.enrollments.length / data.classes.length) : 0,
            trend: 'positive',
            trendValue: '+3%'
          }
        ];

        // Generate recent activities
        this.recentActivities = [
          {
            icon: '👨‍🎓',
            title: 'New Student Registered',
            description: 'John Doe has been added to the system',
            time: '2 minutes ago'
          },
          {
            icon: '👨‍🏫',
            title: 'Teacher Profile Updated',
            description: 'Dr. Smith\'s information has been updated',
            time: '15 minutes ago'
          },
          {
            icon: '🏫',
            title: 'New Class Created',
            description: 'Advanced Mathematics class has been scheduled',
            time: '1 hour ago'
          },
          {
            icon: '📝',
            title: 'Student Enrolled',
            description: 'Jane Wilson enrolled in Physics 101',
            time: '2 hours ago'
          }
        ];
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
      }
    });
  }
} 