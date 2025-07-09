using System.ComponentModel.DataAnnotations;

namespace SchoolManagementApi.Models
{
    public class Student
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string FirstName { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string LastName { get; set; } = string.Empty;
        
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        [StringLength(20)]
        public string PhoneNumber { get; set; } = string.Empty;
        
        public DateTime DateOfBirth { get; set; }
        
        [StringLength(200)]
        public string? Address { get; set; }
        
        public DateTime EnrollmentDate { get; set; } = DateTime.Now;
        
        // Navigation properties
        public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
        
        // Computed property
        public string FullName => $"{FirstName} {LastName}";
        
        // Computed property for age
        public int Age => DateTime.Now.Year - DateOfBirth.Year - (DateTime.Now.DayOfYear < DateOfBirth.DayOfYear ? 1 : 0);
    }
}
