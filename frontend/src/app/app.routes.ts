import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'teachers', loadComponent: () => import('./components/teachers/teacher-list/teacher-list.component').then(m => m.TeacherListComponent) },
  { path: 'teachers/new', loadComponent: () => import('./components/teachers/teacher-form/teacher-form.component').then(m => m.TeacherFormComponent) },
  { path: 'teachers/:id', loadComponent: () => import('./components/teachers/teacher-form/teacher-form.component').then(m => m.TeacherFormComponent) },
  { path: 'students', loadComponent: () => import('./components/students/student-list/student-list.component').then(m => m.StudentListComponent) },
  { path: 'students/new', loadComponent: () => import('./components/students/student-form/student-form.component').then(m => m.StudentFormComponent) },
  { path: 'students/:id', loadComponent: () => import('./components/students/student-form/student-form.component').then(m => m.StudentFormComponent) },
  { path: 'subjects', loadComponent: () => import('./components/subjects/subject-list/subject-list.component').then(m => m.SubjectListComponent) },
  { path: 'subjects/new', loadComponent: () => import('./components/subjects/subject-form/subject-form.component').then(m => m.SubjectFormComponent) },
  { path: 'subjects/:id', loadComponent: () => import('./components/subjects/subject-form/subject-form.component').then(m => m.SubjectFormComponent) },
  { path: 'classes', loadComponent: () => import('./components/classes/class-list/class-list.component').then(m => m.ClassListComponent) },
  { path: 'classes/new', loadComponent: () => import('./components/classes/class-form/class-form.component').then(m => m.ClassFormComponent) },
  { path: 'classes/:id', loadComponent: () => import('./components/classes/class-form/class-form.component').then(m => m.ClassFormComponent) },
  { path: 'enrollments', loadComponent: () => import('./components/enrollments/enrollment-list/enrollment-list.component').then(m => m.EnrollmentListComponent) },
  { path: 'enrollments/new', loadComponent: () => import('./components/enrollments/enrollment-form/enrollment-form.component').then(m => m.EnrollmentFormComponent) },
  { path: '**', redirectTo: '/dashboard' }
];
