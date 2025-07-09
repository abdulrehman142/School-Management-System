using System.ComponentModel.DataAnnotations;

namespace SchoolManagementApi.Models
{
    public class Subject
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? Description { get; set; }
        
        [StringLength(10)]
        public string? Code { get; set; }
        
        public int Credits { get; set; } = 3;
        
        [StringLength(100)]
        public string? Department { get; set; }
        
        // Navigation properties
        public ICollection<ClassLecture> ClassLectures { get; set; } = new List<ClassLecture>();
    }
}
