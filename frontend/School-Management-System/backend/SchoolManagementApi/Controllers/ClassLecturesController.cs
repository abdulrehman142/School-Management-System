using Microsoft.AspNetCore.Mvc;
using SchoolManagementApi.Models;
using SchoolManagementApi.Services;

namespace SchoolManagementApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClassLecturesController : ControllerBase
    {
        private readonly ClassLectureService _classLectureService;

        public ClassLecturesController(ClassLectureService classLectureService)
        {
            _classLectureService = classLectureService;
        }

        // GET: api/ClassLectures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClassLecture>>> GetClassLectures()
        {
            var classLectures = await _classLectureService.GetAllClassLecturesAsync();
            return Ok(classLectures);
        }

        // GET: api/ClassLectures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClassLecture>> GetClassLecture(int id)
        {
            var classLecture = await _classLectureService.GetClassLectureByIdAsync(id);
            if (classLecture == null)
                return NotFound();
            return Ok(classLecture);
        }

        // POST: api/ClassLectures
        [HttpPost]
        public async Task<ActionResult> CreateClassLecture(ClassLecture classLecture)
        {
            await _classLectureService.CreateClassLectureAsync(classLecture);
            return Ok();
        }

        // PUT: api/ClassLectures/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClassLecture(int id, ClassLecture classLecture)
        {
            if (id != classLecture.Id)
                return BadRequest();
            await _classLectureService.UpdateClassLectureAsync(classLecture);
            return NoContent();
        }

        // DELETE: api/ClassLectures/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClassLecture(int id)
        {
            await _classLectureService.DeleteClassLectureAsync(id);
            return NoContent();
        }
    }
} 