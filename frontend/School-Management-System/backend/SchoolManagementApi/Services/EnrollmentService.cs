using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SchoolManagementApi.Models;

namespace SchoolManagementApi.Services
{
    public class EnrollmentService
    {
        private readonly string _connectionString;

        public EnrollmentService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<List<Enrollment>> GetAllEnrollmentsAsync()
        {
            var enrollments = new List<Enrollment>();
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("GetAllEnrollments", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                await connection.OpenAsync();
                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        enrollments.Add(new Enrollment
                        {
                            Id = reader.GetInt32(0),
                            StudentId = reader.GetInt32(1),
                            ClassLectureId = reader.GetInt32(2),
                            EnrollmentDate = reader.GetDateTime(3),
                            Grade = reader.IsDBNull(4) ? null : reader.GetString(4),
                            IsActive = reader.GetBoolean(5)
                        });
                    }
                }
            }
            return enrollments;
        }

        public async Task<Enrollment?> GetEnrollmentByIdAsync(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("GetEnrollmentById", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Id", id);
                await connection.OpenAsync();
                using (var reader = await command.ExecuteReaderAsync())
                {
                    if (await reader.ReadAsync())
                    {
                        return new Enrollment
                        {
                            Id = reader.GetInt32(0),
                            StudentId = reader.GetInt32(1),
                            ClassLectureId = reader.GetInt32(2),
                            EnrollmentDate = reader.GetDateTime(3),
                            Grade = reader.IsDBNull(4) ? null : reader.GetString(4),
                            IsActive = reader.GetBoolean(5)
                        };
                    }
                }
            }
            return null;
        }

        public async Task CreateEnrollmentAsync(Enrollment enrollment)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("CreateEnrollment", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@StudentId", enrollment.StudentId);
                command.Parameters.AddWithValue("@ClassLectureId", enrollment.ClassLectureId);
                command.Parameters.AddWithValue("@EnrollmentDate", enrollment.EnrollmentDate);
                command.Parameters.AddWithValue("@Grade", (object?)enrollment.Grade ?? DBNull.Value);
                command.Parameters.AddWithValue("@IsActive", enrollment.IsActive);
                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
            }
        }

        public async Task UpdateEnrollmentAsync(Enrollment enrollment)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("UpdateEnrollment", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Id", enrollment.Id);
                command.Parameters.AddWithValue("@StudentId", enrollment.StudentId);
                command.Parameters.AddWithValue("@ClassLectureId", enrollment.ClassLectureId);
                command.Parameters.AddWithValue("@EnrollmentDate", enrollment.EnrollmentDate);
                command.Parameters.AddWithValue("@Grade", (object?)enrollment.Grade ?? DBNull.Value);
                command.Parameters.AddWithValue("@IsActive", enrollment.IsActive);
                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
            }
        }

        public async Task DeleteEnrollmentAsync(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("DeleteEnrollment", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Id", id);
                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
            }
        }
    }
} 