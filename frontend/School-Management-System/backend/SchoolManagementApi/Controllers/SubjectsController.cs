using Microsoft.AspNetCore.Mvc;
using SchoolManagementApi.Models;
using SchoolManagementApi.Services;

namespace SchoolManagementApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubjectsController : ControllerBase
    {
        private readonly SubjectService _subjectService;

        public SubjectsController(SubjectService subjectService)
        {
            _subjectService = subjectService;
        }

        // GET: api/Subjects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subject>>> GetSubjects()
        {
            var subjects = await _subjectService.GetAllSubjectsAsync();
            return Ok(subjects);
        }

        // GET: api/Subjects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Subject>> GetSubject(int id)
        {
            var subject = await _subjectService.GetSubjectByIdAsync(id);
            if (subject == null)
                return NotFound();
            return Ok(subject);
        }

        // POST: api/Subjects
        [HttpPost]
        public async Task<ActionResult> CreateSubject(Subject subject)
        {
            await _subjectService.CreateSubjectAsync(subject);
            return Ok();
        }

        // PUT: api/Subjects/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubject(int id, Subject subject)
        {
            if (id != subject.Id)
                return BadRequest();
            await _subjectService.UpdateSubjectAsync(subject);
            return NoContent();
        }

        // DELETE: api/Subjects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubject(int id)
        {
            await _subjectService.DeleteSubjectAsync(id);
            return NoContent();
        }
    }
} 