using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PiletasEscoria.Models;

namespace PiletasEscoria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly Level3_SM_WastePoolContext _context;

        public StatusController(Level3_SM_WastePoolContext context)
        {
            _context = context;
        }

        // GET: api/Status
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Status>>> GetStatus()
        {
            return await _context.Status.ToListAsync();
        }

        // GET: api/Status/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Status>> GetStatus(int id)
        {
            var status = await _context.Status.FindAsync(id);

            if (status == null)
            {
                return NotFound();
            }

            return status;
        }

        // PUT: api/Status/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut]
        public async Task<ActionResult<int>> PutStatus(Status status)
        {
            try
            {
                {
                    _context.Entry(status).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                }
                return 1;
            }
            catch (DbUpdateConcurrencyException)
            {
                return -1;
            }
        }

        //public async Task<IActionResult> PutStatus(int id, Status status)
        //{
        //    if (id != status.IdStatus)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(status).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!StatusExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        // POST: api/Status
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<int>> PostStatus(Status status)
        {
            try
            {
                {

                    _context.Status.Add(status);
                    await _context.SaveChangesAsync();

                }
                //return CreatedAtAction("GetStatus", new { id = status.IdStatus }, status);
                return 1;
            }

            catch
            {
                return -1;
            }                
        }

        // DELETE: api/Status/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Status>> DeleteStatus(int id)
        {
            var status = await _context.Status.FindAsync(id);
            if (status == null)
            {
                return NotFound();
            }

            _context.Status.Remove(status);
            await _context.SaveChangesAsync();

            return status;
        }

        private bool StatusExists(int id)
        {
            return _context.Status.Any(e => e.IdStatus == id);
        }
    }
}
