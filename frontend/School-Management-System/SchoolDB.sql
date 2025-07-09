-- 1. Create and Use Database
IF DB_ID('schooldb') IS NULL CREATE DATABASE schooldb;
GO
USE schooldb;
GO

-- 2. Drop Tables If Exist
IF OBJECT_ID('Enrollments', 'U') IS NOT NULL DROP TABLE Enrollments;
IF OBJECT_ID('ClassLectures', 'U') IS NOT NULL DROP TABLE ClassLectures;
IF OBJECT_ID('Subjects', 'U') IS NOT NULL DROP TABLE Subjects;
IF OBJECT_ID('Teachers', 'U') IS NOT NULL DROP TABLE Teachers;
IF OBJECT_ID('Students', 'U') IS NOT NULL DROP TABLE Students;
GO

-- 3. Create Tables
CREATE TABLE Students (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PhoneNumber NVARCHAR(20),
    DateOfBirth DATE,
    Address NVARCHAR(200),
    EnrollmentDate DATE
);
GO
CREATE TABLE Teachers (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PhoneNumber NVARCHAR(20),
    Department NVARCHAR(100),
    HireDate DATE
);
GO
CREATE TABLE Subjects (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL UNIQUE,
    Description NVARCHAR(200),
    Credits INT
);
GO
CREATE TABLE ClassLectures (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(200),
    SubjectId INT NOT NULL,
    TeacherId INT NOT NULL,
    StartTime DATETIME,
    EndTime DATETIME,
    Room NVARCHAR(50),
    MaxCapacity INT,
    IsActive BIT,
    CreatedDate DATETIME,
    FOREIGN KEY (SubjectId) REFERENCES Subjects(Id),
    FOREIGN KEY (TeacherId) REFERENCES Teachers(Id)
);
GO
CREATE TABLE Enrollments (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    StudentId INT NOT NULL,
    ClassLectureId INT NOT NULL,
    EnrollmentDate DATETIME,
    Grade NVARCHAR(5),
    IsActive BIT,
    FOREIGN KEY (StudentId) REFERENCES Students(Id),
    FOREIGN KEY (ClassLectureId) REFERENCES ClassLectures(Id),
    CONSTRAINT UQ_Student_Class UNIQUE (StudentId, ClassLectureId)
);
GO

-- 4. Insert Sample Data
-- Students
INSERT INTO Students (FirstName, LastName, Email, PhoneNumber, DateOfBirth, Address, EnrollmentDate) VALUES
('Rayyan', 'Kamran', 'rayyan.kamran@student.com', '555-0001', '2000-01-15', '123 Student St', '2024-01-15'),
('Abdul', 'Rehman', 'abdul.rehman@student.com', '555-0002', '2000-02-20', '124 Student St', '2024-01-16'),
('Hassan', 'Tariq', 'hassan.tariq@student.com', '555-0003', '2000-03-10', '125 Student St', '2024-01-17'),
('Usman', 'Ghani', 'usman.ghani@student.com', '555-0004', '2000-04-10', '126 Student St', '2024-01-18'),
('Bilal', 'Ahmed', 'bilal.ahmed@student.com', '555-0005', '2000-05-12', '127 Student St', '2024-01-19'),
('Ali', 'Raza', 'ali.raza@student.com', '555-0006', '2000-06-18', '128 Student St', '2024-01-20'),
('Zayan', 'Qureshi', 'zayan.qureshi@student.com', '555-0007', '2000-07-25', '129 Student St', '2024-01-21'),
('Ammar', 'Siddiqui', 'ammar.siddiqui@student.com', '555-0008', '2000-08-30', '130 Student St', '2024-01-22'),
('Daniyal', 'Khan', 'daniyal.khan@student.com', '555-0009', '2000-09-14', '131 Student St', '2024-01-23'),
('Mubashir', 'Iqbal', 'mubashir.iqbal@student.com', '555-0010', '2000-10-22', '132 Student St', '2024-01-24');
GO
-- Teachers
INSERT INTO Teachers (FirstName, LastName, Email, PhoneNumber, Department, HireDate) VALUES
('Hamza', 'Waheed', 'hamza.waheed@teacher.com', '555-1001', 'CS', '2019-01-15'),
('Fahad', 'Mehmood', 'fahad.mehmood@teacher.com', '555-1002', 'CS', '2019-02-20'),
('Shoaib', 'Aslam', 'shoaib.aslam@teacher.com', '555-1003', 'CS', '2019-03-10'),
('Zohaib', 'Khalid', 'zohaib.khalid@teacher.com', '555-1004', 'CS', '2019-04-05'),
('Nouman', 'Farooq', 'nouman.farooq@teacher.com', '555-1005', 'CS', '2019-05-12'),
('Imran', 'Javed', 'imran.javed@teacher.com', '555-1006', 'CS', '2019-06-18'),
('Ahmed', 'Rafi', 'ahmed.rafi@teacher.com', '555-1007', 'CS', '2019-07-25'),
('Saad', 'Zafar', 'saad.zafar@teacher.com', '555-1008', 'CS', '2019-08-30'),
('Tariq', 'Baig', 'tariq.baig@teacher.com', '555-1009', 'CS', '2019-09-14'),
('Waqas', 'Anwar', 'waqas.anwar@teacher.com', '555-1010', 'CS', '2019-10-22');
GO
-- Subjects
INSERT INTO Subjects (Name, Description, Credits) VALUES
('Data Structures', 'Fundamental structures', 3),
('Algorithms', 'Design and analysis', 3),
('Operating Systems', 'Processes and memory', 4),
('Databases', 'SQL and design', 3),
('Networks', 'Protocols and layers', 3),
('Software Eng', 'SDLC and models', 3),
('AI', 'Artificial Intelligence basics', 4),
('Machine Learning', 'ML algorithms', 4),
('Web Dev', 'HTML, CSS, JS', 3),
('Mobile Apps', 'Android/iOS basics', 3);
GO
-- ClassLectures
INSERT INTO ClassLectures (Name, Description, SubjectId, TeacherId, StartTime, EndTime, Room, MaxCapacity, IsActive, CreatedDate) VALUES
('DS - F302', 'Advanced structures', 1, 1, '2024-12-20 09:00', '2024-12-20 10:30', 'F302', 25, 1, '2024-12-19'),
('Algo - A201', 'Design & analysis', 2, 2, '2024-12-20 11:00', '2024-12-20 12:30', 'A201', 20, 1, '2024-12-19'),
('OS - B104', 'Memory management', 3, 3, '2024-12-20 13:00', '2024-12-20 14:30', 'B104', 30, 1, '2024-12-19'),
('DB - G501', 'Normalization & SQL', 4, 4, '2024-12-20 15:00', '2024-12-20 16:30', 'G501', 25, 1, '2024-12-19'),
('Net - C301', 'TCP/IP & Layers', 5, 5, '2024-12-21 09:00', '2024-12-21 10:30', 'C301', 20, 1, '2024-12-19'),
('SE - D206', 'Waterfall & Agile', 6, 6, '2024-12-21 11:00', '2024-12-21 12:30', 'D206', 25, 1, '2024-12-19'),
('AI - H407', 'Search & ML', 7, 7, '2024-12-21 13:00', '2024-12-21 14:30', 'H407', 20, 1, '2024-12-19'),
('ML - E308', 'Regression, Trees', 8, 8, '2024-12-21 15:00', '2024-12-21 16:30', 'E308', 20, 1, '2024-12-19'),
('Web - L109', 'Frontend basics', 9, 9, '2024-12-22 09:00', '2024-12-22 10:30', 'L109', 30, 1, '2024-12-19'),
('Mobile - K203', 'React Native', 10, 10, '2024-12-22 11:00', '2024-12-22 12:30', 'K203', 25, 1, '2024-12-19');
GO
-- Enrollments
INSERT INTO Enrollments (StudentId, ClassLectureId, EnrollmentDate, Grade, IsActive) VALUES
(1, 1, '2024-12-19', 'A', 1), (2, 2, '2024-12-19', 'A', 1), (3, 3, '2024-12-19', 'B+', 1),
(4, 4, '2024-12-19', 'A-', 1), (5, 5, '2024-12-19', 'B', 1), (6, 6, '2024-12-19', 'A', 1),
(7, 7, '2024-12-19', 'B+', 1), (8, 8, '2024-12-19', 'A-', 1), (9, 9, '2024-12-19', 'B', 1),
(10,10, '2024-12-19', 'A', 1), (1, 2, '2024-12-19', 'A', 1), (2, 3, '2024-12-19', 'B+', 1),
(3, 4, '2024-12-19', 'A-', 1), (4, 5, '2024-12-19', 'B', 1);
GO
CREATE PROCEDURE CreateStudent
    @FirstName NVARCHAR(50), @LastName NVARCHAR(50), @Email NVARCHAR(100),
    @PhoneNumber NVARCHAR(20), @DateOfBirth DATE, @Address NVARCHAR(200), @EnrollmentDate DATE
AS
BEGIN
    INSERT INTO Students (FirstName, LastName, Email, PhoneNumber, DateOfBirth, Address, EnrollmentDate)
    VALUES (@FirstName, @LastName, @Email, @PhoneNumber, @DateOfBirth, @Address, @EnrollmentDate);
END
GO

CREATE PROCEDURE GetStudentById @Id INT
AS
BEGIN
    SELECT * FROM Students WHERE Id = @Id;
END
GO

CREATE PROCEDURE UpdateStudent
    @Id INT, @FirstName NVARCHAR(50), @LastName NVARCHAR(50), @Email NVARCHAR(100),
    @PhoneNumber NVARCHAR(20), @DateOfBirth DATE, @Address NVARCHAR(200), @EnrollmentDate DATE
AS
BEGIN
    UPDATE Students SET
        FirstName = @FirstName, LastName = @LastName, Email = @Email,
        PhoneNumber = @PhoneNumber, DateOfBirth = @DateOfBirth,
        Address = @Address, EnrollmentDate = @EnrollmentDate
    WHERE Id = @Id;
END
GO

CREATE PROCEDURE DeleteStudent @Id INT
AS
BEGIN
    DELETE FROM Students WHERE Id = @Id;
END
GO

-- TEACHERS
CREATE PROCEDURE CreateTeacher
    @FirstName NVARCHAR(50), @LastName NVARCHAR(50), @Email NVARCHAR(100),
    @PhoneNumber NVARCHAR(20), @Department NVARCHAR(100), @HireDate DATE
AS
BEGIN
    INSERT INTO Teachers (FirstName, LastName, Email, PhoneNumber, Department, HireDate)
    VALUES (@FirstName, @LastName, @Email, @PhoneNumber, @Department, @HireDate);
END
GO

CREATE PROCEDURE GetTeacherById @Id INT
AS
BEGIN
    SELECT * FROM Teachers WHERE Id = @Id;
END
GO

CREATE PROCEDURE UpdateTeacher
    @Id INT, @FirstName NVARCHAR(50), @LastName NVARCHAR(50), @Email NVARCHAR(100),
    @PhoneNumber NVARCHAR(20), @Department NVARCHAR(100), @HireDate DATE
AS
BEGIN
    UPDATE Teachers SET
        FirstName = @FirstName, LastName = @LastName, Email = @Email,
        PhoneNumber = @PhoneNumber, Department = @Department, HireDate = @HireDate
    WHERE Id = @Id;
END
GO

CREATE PROCEDURE DeleteTeacher @Id INT
AS
BEGIN
    DELETE FROM Teachers WHERE Id = @Id;
END
GO

-- SUBJECTS
CREATE PROCEDURE CreateSubject
    @Name NVARCHAR(100), @Description NVARCHAR(200), @Credits INT
AS
BEGIN
    INSERT INTO Subjects (Name, Description, Credits) VALUES (@Name, @Description, @Credits);
END
GO

CREATE PROCEDURE GetSubjectById @Id INT
AS
BEGIN
    SELECT * FROM Subjects WHERE Id = @Id;
END
GO

CREATE PROCEDURE UpdateSubject
    @Id INT, @Name NVARCHAR(100), @Description NVARCHAR(200), @Credits INT
AS
BEGIN
    UPDATE Subjects SET Name = @Name, Description = @Description, Credits = @Credits WHERE Id = @Id;
END
GO

CREATE PROCEDURE DeleteSubject @Id INT
AS
BEGIN
    DELETE FROM Subjects WHERE Id = @Id;
END
GO

-- CLASSLECTURES
CREATE PROCEDURE CreateClassLecture
    @Name NVARCHAR(100), @Description NVARCHAR(200), @SubjectId INT, @TeacherId INT,
    @StartTime DATETIME, @EndTime DATETIME, @Room NVARCHAR(50),
    @MaxCapacity INT, @IsActive BIT, @CreatedDate DATETIME
AS
BEGIN
    INSERT INTO ClassLectures (Name, Description, SubjectId, TeacherId, StartTime, EndTime, Room, MaxCapacity, IsActive, CreatedDate)
    VALUES (@Name, @Description, @SubjectId, @TeacherId, @StartTime, @EndTime, @Room, @MaxCapacity, @IsActive, @CreatedDate);
END
GO

CREATE PROCEDURE GetClassLectureById @Id INT
AS
BEGIN
    SELECT * FROM ClassLectures WHERE Id = @Id;
END
GO

CREATE PROCEDURE UpdateClassLecture
    @Id INT, @Name NVARCHAR(100), @Description NVARCHAR(200), @SubjectId INT, @TeacherId INT,
    @StartTime DATETIME, @EndTime DATETIME, @Room NVARCHAR(50),
    @MaxCapacity INT, @IsActive BIT, @CreatedDate DATETIME
AS
BEGIN
    UPDATE ClassLectures SET Name = @Name, Description = @Description, SubjectId = @SubjectId,
        TeacherId = @TeacherId, StartTime = @StartTime, EndTime = @EndTime, Room = @Room,
        MaxCapacity = @MaxCapacity, IsActive = @IsActive, CreatedDate = @CreatedDate
    WHERE Id = @Id;
END
GO

CREATE PROCEDURE DeleteClassLecture @Id INT
AS
BEGIN
    DELETE FROM ClassLectures WHERE Id = @Id;
END
GO

-- ENROLLMENTS
CREATE PROCEDURE CreateEnrollment
    @StudentId INT, @ClassLectureId INT, @EnrollmentDate DATETIME, @Grade NVARCHAR(5), @IsActive BIT
AS
BEGIN
    INSERT INTO Enrollments (StudentId, ClassLectureId, EnrollmentDate, Grade, IsActive)
    VALUES (@StudentId, @ClassLectureId, @EnrollmentDate, @Grade, @IsActive);
END
GO

CREATE PROCEDURE GetEnrollmentById @Id INT
AS
BEGIN
    SELECT * FROM Enrollments WHERE Id = @Id;
END
GO

CREATE PROCEDURE UpdateEnrollment
    @Id INT, @StudentId INT, @ClassLectureId INT, @EnrollmentDate DATETIME, @Grade NVARCHAR(5), @IsActive BIT
AS
BEGIN
    UPDATE Enrollments SET StudentId = @StudentId, ClassLectureId = @ClassLectureId,
        EnrollmentDate = @EnrollmentDate, Grade = @Grade, IsActive = @IsActive
    WHERE Id = @Id;
END
GO

CREATE PROCEDURE DeleteEnrollment @Id INT
AS
BEGIN
    DELETE FROM Enrollments WHERE Id = @Id;
END
GO

-- ======================================
-- 6. VIEWS
-- ======================================

-- Student Enrollments View
CREATE VIEW ViewStudentEnrollments AS
SELECT
    e.Id AS EnrollmentId,
    s.FirstName + ' ' + s.LastName AS StudentName,
    c.Name AS ClassLecture,
    sub.Name AS Subject,
    t.FirstName + ' ' + t.LastName AS TeacherName,
    e.Grade,
    e.EnrollmentDate,
    e.IsActive
FROM Enrollments e
JOIN Students s ON e.StudentId = s.Id
JOIN ClassLectures c ON e.ClassLectureId = c.Id
JOIN Subjects sub ON c.SubjectId = sub.Id
JOIN Teachers t ON c.TeacherId = t.Id;
GO

-- Teacher Schedules View
CREATE VIEW ViewTeacherSchedules AS
SELECT
    t.FirstName + ' ' + t.LastName AS TeacherName,
    cl.Name AS ClassName,
    s.Name AS Subject,
    cl.Room,
    cl.StartTime,
    cl.EndTime,
    cl.IsActive
FROM ClassLectures cl
JOIN Teachers t ON cl.TeacherId = t.Id
JOIN Subjects s ON cl.SubjectId = s.Id;
GO

-- Class Capacity & Enrollments View
CREATE VIEW ViewClassCapacity AS
SELECT
    c.Id AS ClassId,
    c.Name AS ClassName,
    c.MaxCapacity,
    COUNT(e.Id) AS CurrentEnrollment,
    (c.MaxCapacity - COUNT(e.Id)) AS SeatsRemaining
FROM ClassLectures c
LEFT JOIN Enrollments e ON c.Id = e.ClassLectureId AND e.IsActive = 1
GROUP BY c.Id, c.Name, c.MaxCapacity;
GO
CREATE PROCEDURE GetAllStudents
AS
BEGIN
    SELECT Id, FirstName, LastName, Email, PhoneNumber, DateOfBirth, Address, EnrollmentDate
    FROM Students
END
GO
-- Get all students
CREATE OR ALTER PROCEDURE GetAllStudents
AS
BEGIN
    SELECT Id, FirstName, LastName, Email, PhoneNumber, DateOfBirth, Address, EnrollmentDate
    FROM Students
END
GO

-- Get student by ID
CREATE OR ALTER PROCEDURE GetStudentById
    @Id INT
AS
BEGIN
    SELECT Id, FirstName, LastName, Email, PhoneNumber, DateOfBirth, Address, EnrollmentDate
    FROM Students
    WHERE Id = @Id
END
GO

-- Create student
CREATE OR ALTER PROCEDURE CreateStudent
    @FirstName NVARCHAR(100),
    @LastName NVARCHAR(100),
    @Email NVARCHAR(100),
    @PhoneNumber NVARCHAR(20),
    @DateOfBirth DATE,
    @Address NVARCHAR(200),
    @EnrollmentDate DATE
AS
BEGIN
    INSERT INTO Students (FirstName, LastName, Email, PhoneNumber, DateOfBirth, Address, EnrollmentDate)
    VALUES (@FirstName, @LastName, @Email, @PhoneNumber, @DateOfBirth, @Address, @EnrollmentDate)
END
GO

-- Update student
CREATE OR ALTER PROCEDURE UpdateStudent
    @Id INT,
    @FirstName NVARCHAR(100),
    @LastName NVARCHAR(100),
    @Email NVARCHAR(100),
    @PhoneNumber NVARCHAR(20),
    @DateOfBirth DATE,
    @Address NVARCHAR(200),
    @EnrollmentDate DATE
AS
BEGIN
    UPDATE Students
    SET FirstName = @FirstName,
        LastName = @LastName,
        Email = @Email,
        PhoneNumber = @PhoneNumber,
        DateOfBirth = @DateOfBirth,
        Address = @Address,
        EnrollmentDate = @EnrollmentDate
    WHERE Id = @Id
END
GO

-- Delete student
CREATE OR ALTER PROCEDURE DeleteStudent
    @Id INT
AS
BEGIN
    DELETE FROM Students WHERE Id = @Id
END
GO
-- Get all teachers
CREATE OR ALTER PROCEDURE GetAllTeachers
AS
BEGIN
    SELECT Id, FirstName, LastName, Email, PhoneNumber, Department, HireDate
    FROM Teachers
END
GO

-- Get teacher by ID
CREATE OR ALTER PROCEDURE GetTeacherById
    @Id INT
AS
BEGIN
    SELECT Id, FirstName, LastName, Email, PhoneNumber, Department, HireDate
    FROM Teachers
    WHERE Id = @Id
END
GO

-- Create teacher
CREATE OR ALTER PROCEDURE CreateTeacher
    @FirstName NVARCHAR(100),
    @LastName NVARCHAR(100),
    @Email NVARCHAR(100),
    @PhoneNumber NVARCHAR(20),
    @Department NVARCHAR(100),
    @HireDate DATE
AS
BEGIN
    INSERT INTO Teachers (FirstName, LastName, Email, PhoneNumber, Department, HireDate)
    VALUES (@FirstName, @LastName, @Email, @PhoneNumber, @Department, @HireDate)
END
GO

-- Update teacher
CREATE OR ALTER PROCEDURE UpdateTeacher
    @Id INT,
    @FirstName NVARCHAR(100),
    @LastName NVARCHAR(100),
    @Email NVARCHAR(100),
    @PhoneNumber NVARCHAR(20),
    @Department NVARCHAR(100),
    @HireDate DATE
AS
BEGIN
    UPDATE Teachers
    SET FirstName = @FirstName,
        LastName = @LastName,
        Email = @Email,
        PhoneNumber = @PhoneNumber,
        Department = @Department,
        HireDate = @HireDate
    WHERE Id = @Id
END
GO

-- Delete teacher
CREATE OR ALTER PROCEDURE DeleteTeacher
    @Id INT
AS
BEGIN
    DELETE FROM Teachers WHERE Id = @Id
END
GO
-- Get all subjects
CREATE OR ALTER PROCEDURE GetAllSubjects
AS
BEGIN
    SELECT Id, Name, Description, Code, Credits, Department
    FROM Subjects
END
GO

-- Get subject by ID
CREATE OR ALTER PROCEDURE GetSubjectById
    @Id INT
AS
BEGIN
    SELECT Id, Name, Description, Code, Credits, Department
    FROM Subjects
    WHERE Id = @Id
END
GO

-- Create subject
CREATE OR ALTER PROCEDURE CreateSubject
    @Name NVARCHAR(100),
    @Description NVARCHAR(500),
    @Code NVARCHAR(10),
    @Credits INT,
    @Department NVARCHAR(100)
AS
BEGIN
    INSERT INTO Subjects (Name, Description, Code, Credits, Department)
    VALUES (@Name, @Description, @Code, @Credits, @Department)
END
GO

-- Update subject
CREATE OR ALTER PROCEDURE UpdateSubject
    @Id INT,
    @Name NVARCHAR(100),
    @Description NVARCHAR(500),
    @Code NVARCHAR(10),
    @Credits INT,
    @Department NVARCHAR(100)
AS
BEGIN
    UPDATE Subjects
    SET Name = @Name,
        Description = @Description,
        Code = @Code,
        Credits = @Credits,
        Department = @Department
    WHERE Id = @Id
END
GO

-- Delete subject
CREATE OR ALTER PROCEDURE DeleteSubject
    @Id INT
AS
BEGIN
    DELETE FROM Subjects WHERE Id = @Id
END
GO
-- Get all class lectures
CREATE OR ALTER PROCEDURE GetAllClassLectures
AS
BEGIN
    SELECT Id, Name, Description, SubjectId, TeacherId, StartTime, EndTime, Room, MaxCapacity, IsActive, CreatedDate
    FROM ClassLectures
END
GO

-- Get class lecture by ID
CREATE OR ALTER PROCEDURE GetClassLectureById
    @Id INT
AS
BEGIN
    SELECT Id, Name, Description, SubjectId, TeacherId, StartTime, EndTime, Room, MaxCapacity, IsActive, CreatedDate
    FROM ClassLectures
    WHERE Id = @Id
END
GO

-- Create class lecture
CREATE OR ALTER PROCEDURE CreateClassLecture
    @Name NVARCHAR(100),
    @Description NVARCHAR(200),
    @SubjectId INT,
    @TeacherId INT,
    @StartTime DATETIME,
    @EndTime DATETIME,
    @Room NVARCHAR(50),
    @MaxCapacity INT,
    @IsActive BIT,
    @CreatedDate DATETIME
AS
BEGIN
    INSERT INTO ClassLectures (Name, Description, SubjectId, TeacherId, StartTime, EndTime, Room, MaxCapacity, IsActive, CreatedDate)
    VALUES (@Name, @Description, @SubjectId, @TeacherId, @StartTime, @EndTime, @Room, @MaxCapacity, @IsActive, @CreatedDate)
END
GO

-- Update class lecture
CREATE OR ALTER PROCEDURE UpdateClassLecture
    @Id INT,
    @Name NVARCHAR(100),
    @Description NVARCHAR(200),
    @SubjectId INT,
    @TeacherId INT,
    @StartTime DATETIME,
    @EndTime DATETIME,
    @Room NVARCHAR(50),
    @MaxCapacity INT,
    @IsActive BIT,
    @CreatedDate DATETIME
AS
BEGIN
    UPDATE ClassLectures
    SET Name = @Name,
        Description = @Description,
        SubjectId = @SubjectId,
        TeacherId = @TeacherId,
        StartTime = @StartTime,
        EndTime = @EndTime,
        Room = @Room,
        MaxCapacity = @MaxCapacity,
        IsActive = @IsActive,
        CreatedDate = @CreatedDate
    WHERE Id = @Id
END
GO

-- Delete class lecture
CREATE OR ALTER PROCEDURE DeleteClassLecture
    @Id INT
AS
BEGIN
    DELETE FROM ClassLectures WHERE Id = @Id
END
GO
-- Get all enrollments
CREATE OR ALTER PROCEDURE GetAllEnrollments
AS
BEGIN
    SELECT Id, StudentId, ClassLectureId, EnrollmentDate, Grade, IsActive
    FROM Enrollments
END
GO

-- Get enrollment by ID
CREATE OR ALTER PROCEDURE GetEnrollmentById
    @Id INT
AS
BEGIN
    SELECT Id, StudentId, ClassLectureId, EnrollmentDate, Grade, IsActive
    FROM Enrollments
    WHERE Id = @Id
END
GO

-- Create enrollment
CREATE OR ALTER PROCEDURE CreateEnrollment
    @StudentId INT,
    @ClassLectureId INT,
    @EnrollmentDate DATETIME,
    @Grade NVARCHAR(5),
    @IsActive BIT
AS
BEGIN
    INSERT INTO Enrollments (StudentId, ClassLectureId, EnrollmentDate, Grade, IsActive)
    VALUES (@StudentId, @ClassLectureId, @EnrollmentDate, @Grade, @IsActive)
END
GO

-- Update enrollment
CREATE OR ALTER PROCEDURE UpdateEnrollment
    @Id INT,
    @StudentId INT,
    @ClassLectureId INT,
    @EnrollmentDate DATETIME,
    @Grade NVARCHAR(5),
    @IsActive BIT
AS
BEGIN
    UPDATE Enrollments
    SET StudentId = @StudentId,
        ClassLectureId = @ClassLectureId,
        EnrollmentDate = @EnrollmentDate,
        Grade = @Grade,
        IsActive = @IsActive
    WHERE Id = @Id
END
GO

-- Delete enrollment
CREATE OR ALTER PROCEDURE DeleteEnrollment
    @Id INT
AS
BEGIN
    DELETE FROM Enrollments WHERE Id = @Id
END
GO