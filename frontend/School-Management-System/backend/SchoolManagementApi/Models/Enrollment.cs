using System.ComponentModel.DataAnnotations;

namespace SchoolManagementApi.Models
{
    public class Enrollment
    {
        public int Id { get; set; }
        
        [Required]
        public int StudentId { get; set; }
        
        [Required]
        public int ClassLectureId { get; set; }
        
        public DateTime EnrollmentDate { get; set; } = DateTime.Now;
        
        public string? Grade { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        // Navigation properties
        public Student Student { get; set; } = null!;
        public ClassLecture ClassLecture { get; set; } = null!;
    }
}
