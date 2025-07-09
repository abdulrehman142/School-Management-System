export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  department?: string;
  hireDate: Date;
  fullName?: string;
  classLectures?: ClassLecture[];
}

export interface ClassLecture {
  id: number;
  name: string;
  description?: string;
  subjectId: number;
  teacherId: number;
  startTime: Date;
  endTime: Date;
  room?: string;
  maxCapacity: number;
  isActive: boolean;
  createdDate: Date;
  subject?: Subject;
  teacher?: Teacher;
  enrollments?: Enrollment[];
  currentEnrollmentCount?: number;
  hasAvailableSpots?: boolean;
}

export interface Subject {
  id: number;
  name: string;
  description?: string;
  code?: string;
  credits: number;
  department?: string;
  classLectures?: ClassLecture[];
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  address?: string;
  enrollmentDate: Date;
  fullName?: string;
  age?: number;
  enrollments?: Enrollment[];
}

export interface Enrollment {
  id: number;
  studentId: number;
  classLectureId: number;
  enrollmentDate: Date;
  grade?: string;
  isActive: boolean;
  student?: Student;
  classLecture?: ClassLecture;
}

export interface BulkEnrollmentRequest {
  classLectureId: number;
  studentIds: number[];
} 