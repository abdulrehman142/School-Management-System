using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SchoolManagementApi.Models;

namespace SchoolManagementApi.Services
{
    public class StudentService
    {
        private readonly string _connectionString;

        public StudentService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<List<Student>> GetAllStudentsAsync()
        {
            var students = new List<Student>();
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("GetAllStudents", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                await connection.OpenAsync();
                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        students.Add(new Student
                        {
                            Id = reader.GetInt32(0),
                            FirstName = reader.GetString(1),
                            LastName = reader.GetString(2),
                            Email = reader.GetString(3),
                            PhoneNumber = reader.GetString(4),
                            DateOfBirth = reader.GetDateTime(5),
                            Address = reader.IsDBNull(6) ? null : reader.GetString(6),
                            EnrollmentDate = reader.GetDateTime(7)
                        });
                    }
                }
            }
            return students;
        }

        public async Task<Student?> GetStudentByIdAsync(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("GetStudentById", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Id", id);
                await connection.OpenAsync();
                using (var reader = await command.ExecuteReaderAsync())
                {
                    if (await reader.ReadAsync())
                    {
                        return new Student
                        {
                            Id = reader.GetInt32(0),
                            FirstName = reader.GetString(1),
                            LastName = reader.GetString(2),
                            Email = reader.GetString(3),
                            PhoneNumber = reader.GetString(4),
                            DateOfBirth = reader.GetDateTime(5),
                            Address = reader.IsDBNull(6) ? null : reader.GetString(6),
                            EnrollmentDate = reader.GetDateTime(7)
                        };
                    }
                }
            }
            return null;
        }

        public async Task CreateStudentAsync(Student student)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("CreateStudent", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@FirstName", student.FirstName);
                command.Parameters.AddWithValue("@LastName", student.LastName);
                command.Parameters.AddWithValue("@Email", student.Email);
                command.Parameters.AddWithValue("@PhoneNumber", student.PhoneNumber);
                command.Parameters.AddWithValue("@DateOfBirth", student.DateOfBirth);
                command.Parameters.AddWithValue("@Address", (object?)student.Address ?? DBNull.Value);
                command.Parameters.AddWithValue("@EnrollmentDate", student.EnrollmentDate);
                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
            }
        }

        public async Task UpdateStudentAsync(Student student)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("UpdateStudent", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Id", student.Id);
                command.Parameters.AddWithValue("@FirstName", student.FirstName);
                command.Parameters.AddWithValue("@LastName", student.LastName);
                command.Parameters.AddWithValue("@Email", student.Email);
                command.Parameters.AddWithValue("@PhoneNumber", student.PhoneNumber);
                command.Parameters.AddWithValue("@DateOfBirth", student.DateOfBirth);
                command.Parameters.AddWithValue("@Address", (object?)student.Address ?? DBNull.Value);
                command.Parameters.AddWithValue("@EnrollmentDate", student.EnrollmentDate);
                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
            }
        }

        public async Task DeleteStudentAsync(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("DeleteStudent", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Id", id);
                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
            }
        }
    }
} 