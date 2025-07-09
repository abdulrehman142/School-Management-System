using Microsoft.AspNetCore.Mvc;
using SchoolManagementApi.Models;
using SchoolManagementApi.Services;

namespace SchoolManagementApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnrollmentsController : ControllerBase
    {
        private readonly EnrollmentService _enrollmentService;

        public EnrollmentsController(EnrollmentService enrollmentService)
        {
            _enrollmentService = enrollmentService;
        }

        // GET: api/Enrollments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Enrollment>>> GetEnrollments()
        {
            var enrollments = await _enrollmentService.GetAllEnrollmentsAsync();
            return Ok(enrollments);
        }

        // GET: api/Enrollments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Enrollment>> GetEnrollment(int id)
        {
            var enrollment = await _enrollmentService.GetEnrollmentByIdAsync(id);
            if (enrollment == null)
                return NotFound();
            return Ok(enrollment);
        }

        // POST: api/Enrollments
        [HttpPost]
        public async Task<ActionResult> CreateEnrollment(Enrollment enrollment)
        {
            await _enrollmentService.CreateEnrollmentAsync(enrollment);
            return Ok();
        }

        // PUT: api/Enrollments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEnrollment(int id, Enrollment enrollment)
        {
            if (id != enrollment.Id)
                return BadRequest();
            await _enrollmentService.UpdateEnrollmentAsync(enrollment);
            return NoContent();
        }

        // DELETE: api/Enrollments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEnrollment(int id)
        {
            await _enrollmentService.DeleteEnrollmentAsync(id);
            return NoContent();
        }
    }
} 