using System.ComponentModel.DataAnnotations;

namespace SchoolManagementApi.Models
{
    public class ClassLecture
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? Description { get; set; }
        
        [Required]
        public int SubjectId { get; set; }
        
        [Required]
        public int TeacherId { get; set; }
        
        public DateTime StartTime { get; set; }
        
        public DateTime EndTime { get; set; }
        
        [StringLength(50)]
        public string? Room { get; set; }
        
        public int MaxCapacity { get; set; } = 30;
        
        public bool IsActive { get; set; } = true;
        
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        
        // Navigation properties
        public Subject Subject { get; set; } = null!;
        public Teacher Teacher { get; set; } = null!;
        public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
        
        // Computed property
        public int CurrentEnrollmentCount => Enrollments.Count;
        public bool HasAvailableSpots => CurrentEnrollmentCount < MaxCapacity;
    }
}
