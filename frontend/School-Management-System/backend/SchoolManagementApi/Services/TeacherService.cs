using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SchoolManagementApi.Models;

namespace SchoolManagementApi.Services
{
    public class TeacherService
    {
        private readonly string _connectionString;

        public TeacherService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<List<Teacher>> GetAllTeachersAsync()
        {
            var teachers = new List<Teacher>();
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("GetAllTeachers", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                await connection.OpenAsync();
                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        teachers.Add(new Teacher
                        {
                            Id = reader.GetInt32(0),
                            FirstName = reader.GetString(1),
                            LastName = reader.GetString(2),
                            Email = reader.GetString(3),
                            PhoneNumber = reader.GetString(4),
                            Department = reader.IsDBNull(5) ? null : reader.GetString(5),
                            HireDate = reader.GetDateTime(6)
                        });
                    }
                }
            }
            return teachers;
        }

        public async Task<Teacher?> GetTeacherByIdAsync(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("GetTeacherById", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Id", id);
                await connection.OpenAsync();
                using (var reader = await command.ExecuteReaderAsync())
                {
                    if (await reader.ReadAsync())
                    {
                        return new Teacher
                        {
                            Id = reader.GetInt32(0),
                            FirstName = reader.GetString(1),
                            LastName = reader.GetString(2),
                            Email = reader.GetString(3),
                            PhoneNumber = reader.GetString(4),
                            Department = reader.IsDBNull(5) ? null : reader.GetString(5),
                            HireDate = reader.GetDateTime(6)
                        };
                    }
                }
            }
            return null;
        }

        public async Task CreateTeacherAsync(Teacher teacher)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("CreateTeacher", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@FirstName", teacher.FirstName);
                command.Parameters.AddWithValue("@LastName", teacher.LastName);
                command.Parameters.AddWithValue("@Email", teacher.Email);
                command.Parameters.AddWithValue("@PhoneNumber", teacher.PhoneNumber);
                command.Parameters.AddWithValue("@Department", (object?)teacher.Department ?? DBNull.Value);
                command.Parameters.AddWithValue("@HireDate", teacher.HireDate);
                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
            }
        }

        public async Task UpdateTeacherAsync(Teacher teacher)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("UpdateTeacher", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Id", teacher.Id);
                command.Parameters.AddWithValue("@FirstName", teacher.FirstName);
                command.Parameters.AddWithValue("@LastName", teacher.LastName);
                command.Parameters.AddWithValue("@Email", teacher.Email);
                command.Parameters.AddWithValue("@PhoneNumber", teacher.PhoneNumber);
                command.Parameters.AddWithValue("@Department", (object?)teacher.Department ?? DBNull.Value);
                command.Parameters.AddWithValue("@HireDate", teacher.HireDate);
                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
            }
        }

        public async Task DeleteTeacherAsync(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("DeleteTeacher", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Id", id);
                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
            }
        }
    }
} 