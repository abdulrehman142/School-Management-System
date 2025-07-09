using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SchoolManagementApi.Models;

namespace SchoolManagementApi.Services
{
    public class ClassLectureService
    {
        private readonly string _connectionString;

        public ClassLectureService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<List<ClassLecture>> GetAllClassLecturesAsync()
        {
            var classLectures = new List<ClassLecture>();
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("GetAllClassLectures", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                await connection.OpenAsync();
                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        classLectures.Add(new ClassLecture
                        {
                            Id = reader.GetInt32(0),
                            Name = reader.GetString(1),
                            Description = reader.IsDBNull(2) ? null : reader.GetString(2),
                            SubjectId = reader.GetInt32(3),
                            TeacherId = reader.GetInt32(4),
                            StartTime = reader.GetDateTime(5),
                            EndTime = reader.GetDateTime(6),
                            Room = reader.IsDBNull(7) ? null : reader.GetString(7),
                            MaxCapacity = reader.GetInt32(8),
                            IsActive = reader.GetBoolean(9),
                            CreatedDate = reader.GetDateTime(10)
                        });
                    }
                }
            }
            return classLectures;
        }

        public async Task<ClassLecture?> GetClassLectureByIdAsync(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("GetClassLectureById", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Id", id);
                await connection.OpenAsync();
                using (var reader = await command.ExecuteReaderAsync())
                {
                    if (await reader.ReadAsync())
                    {
                        return new ClassLecture
                        {
                            Id = reader.GetInt32(0),
                            Name = reader.GetString(1),
                            Description = reader.IsDBNull(2) ? null : reader.GetString(2),
                            SubjectId = reader.GetInt32(3),
                            TeacherId = reader.GetInt32(4),
                            StartTime = reader.GetDateTime(5),
                            EndTime = reader.GetDateTime(6),
                            Room = reader.IsDBNull(7) ? null : reader.GetString(7),
                            MaxCapacity = reader.GetInt32(8),
                            IsActive = reader.GetBoolean(9),
                            CreatedDate = reader.GetDateTime(10)
                        };
                    }
                }
            }
            return null;
        }

        public async Task CreateClassLectureAsync(ClassLecture classLecture)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("CreateClassLecture", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Name", classLecture.Name);
                command.Parameters.AddWithValue("@Description", (object?)classLecture.Description ?? DBNull.Value);
                command.Parameters.AddWithValue("@SubjectId", classLecture.SubjectId);
                command.Parameters.AddWithValue("@TeacherId", classLecture.TeacherId);
                command.Parameters.AddWithValue("@StartTime", classLecture.StartTime);
                command.Parameters.AddWithValue("@EndTime", classLecture.EndTime);
                command.Parameters.AddWithValue("@Room", (object?)classLecture.Room ?? DBNull.Value);
                command.Parameters.AddWithValue("@MaxCapacity", classLecture.MaxCapacity);
                command.Parameters.AddWithValue("@IsActive", classLecture.IsActive);
                command.Parameters.AddWithValue("@CreatedDate", classLecture.CreatedDate);
                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
            }
        }

        public async Task UpdateClassLectureAsync(ClassLecture classLecture)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("UpdateClassLecture", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Id", classLecture.Id);
                command.Parameters.AddWithValue("@Name", classLecture.Name);
                command.Parameters.AddWithValue("@Description", (object?)classLecture.Description ?? DBNull.Value);
                command.Parameters.AddWithValue("@SubjectId", classLecture.SubjectId);
                command.Parameters.AddWithValue("@TeacherId", classLecture.TeacherId);
                command.Parameters.AddWithValue("@StartTime", classLecture.StartTime);
                command.Parameters.AddWithValue("@EndTime", classLecture.EndTime);
                command.Parameters.AddWithValue("@Room", (object?)classLecture.Room ?? DBNull.Value);
                command.Parameters.AddWithValue("@MaxCapacity", classLecture.MaxCapacity);
                command.Parameters.AddWithValue("@IsActive", classLecture.IsActive);
                command.Parameters.AddWithValue("@CreatedDate", classLecture.CreatedDate);
                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
            }
        }

        public async Task DeleteClassLectureAsync(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("DeleteClassLecture", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Id", id);
                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
            }
        }
    }
} 