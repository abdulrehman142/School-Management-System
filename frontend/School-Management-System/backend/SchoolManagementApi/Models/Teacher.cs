using System.ComponentModel.DataAnnotations;

namespace SchoolManagementApi.Models
{
    public class Teacher
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
        
        [StringLength(200)]
        public string? Department { get; set; }
        
        public DateTime HireDate { get; set; } = DateTime.Now;
        
        // Navigation properties
        public ICollection<ClassLecture> ClassLectures { get; set; } = new List<ClassLecture>();
        
        // Computed property
        public string FullName => $"{FirstName} {LastName}";
    }
}
