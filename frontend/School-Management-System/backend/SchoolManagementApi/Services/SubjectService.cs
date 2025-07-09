using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SchoolManagementApi.Models;

namespace SchoolManagementApi.Services
{
    public class SubjectService
    {
        private readonly string _connectionString;

        public SubjectService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<List<Subject>> GetAllSubjectsAsync()
        {
            var subjects = new List<Subject>();
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("GetAllSubjects", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                await connection.OpenAsync();
                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        subjects.Add(new Subject
                        {
                            Id = reader.GetInt32(0),
                            Name = reader.GetString(1),
                            Description = reader.IsDBNull(2) ? null : reader.GetString(2),
                            Code = reader.IsDBNull(3) ? null : reader.GetString(3),
                            Credits = reader.GetInt32(4),
                            Department = reader.IsDBNull(5) ? null : reader.GetString(5)
                        });
                    }
                }
            }
            return subjects;
        }

        public async Task<Subject?> GetSubjectByIdAsync(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("GetSubjectById", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Id", id);
                await connection.OpenAsync();
                using (var reader = await command.ExecuteReaderAsync())
                {
                    if (await reader.ReadAsync())
                    {
                        return new Subject
                        {
                            Id = reader.GetInt32(0),
                            Name = reader.GetString(1),
                            Description = reader.IsDBNull(2) ? null : reader.GetString(2),
                            Code = reader.IsDBNull(3) ? null : reader.GetString(3),
                            Credits = reader.GetInt32(4),
                            Department = reader.IsDBNull(5) ? null : reader.GetString(5)
                        };
                    }
                }
            }
            return null;
        }

        public async Task CreateSubjectAsync(Subject subject)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("CreateSubject", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Name", subject.Name);
                command.Parameters.AddWithValue("@Description", (object?)subject.Description ?? DBNull.Value);
                command.Parameters.AddWithValue("@Code", (object?)subject.Code ?? DBNull.Value);
                command.Parameters.AddWithValue("@Credits", subject.Credits);
                command.Parameters.AddWithValue("@Department", (object?)subject.Department ?? DBNull.Value);
                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
            }
        }

        public async Task UpdateSubjectAsync(Subject subject)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("UpdateSubject", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Id", subject.Id);
                command.Parameters.AddWithValue("@Name", subject.Name);
                command.Parameters.AddWithValue("@Description", (object?)subject.Description ?? DBNull.Value);
                command.Parameters.AddWithValue("@Code", (object?)subject.Code ?? DBNull.Value);
                command.Parameters.AddWithValue("@Credits", subject.Credits);
                command.Parameters.AddWithValue("@Department", (object?)subject.Department ?? DBNull.Value);
                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
            }
        }

        public async Task DeleteSubjectAsync(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("DeleteSubject", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Id", id);
                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
            }
        }
    }
} 