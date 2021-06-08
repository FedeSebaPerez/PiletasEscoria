using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PiletasEscoria.Models;

namespace PiletasEscoria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailsController : ControllerBase
    {
        private readonly Level3_SM_WastePoolContext _context;

        public EmailsController(Level3_SM_WastePoolContext context)
        {
            _context = context;
        }

        // GET: api/Emails
        [HttpGet]
        //[Route("api/Email/GetAllEmails2")]
        public async Task<ActionResult<IEnumerable<Email>>> GetEmails()
        {
            return await _context.Email.ToListAsync();
        }

        // GET: api/Emails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Email>> GetEmailById(int id)
        {
            var email = await _context.Email.FindAsync(id);

            if (email == null)
            {
                return NotFound();
            }

            return email;
        }

        // PUT: api/Emails
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPut("{id}")]
        [HttpPut]
        public async Task<ActionResult<int>> PutEmail(Email email)
        {
           
            try
            {
                {
                    _context.Entry(email).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                }

                return 1;
            }
            catch (DbUpdateConcurrencyException)
            {
                return -1;
            }            
        }

        //public async Task<IActionResult> PutEmail(int id, Email email)
        //{
        //    //if (id != email.IdEmail)
        //    //{
        //    //    return BadRequest();
        //    //}

        //    _context.Entry(email).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!EmailExists(id))
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

        // POST: api/Emails
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        //[Route("api/Email/PostEmail")]
        public async Task<ActionResult<int>> PostEmail(Email email)        
        {
            if (email.EmailAddress != "")

                try
                {
                    {

                        _context.Email.Add(email);
                        await _context.SaveChangesAsync();

                    }
                    //return CreatedAtAction("GetEmail", new { id = email.IdEmail }, email);
                    return 1;
                }

                catch 
                {
                    return -5;
                }

                else 
                {
                    return -6;
                }
        }

        // DELETE: api/Emails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Email>> DeleteEmail(int id)
        {
            var email = await _context.Email.FindAsync(id);
            if (email == null)
            {
                return NotFound();
            }

            _context.Email.Remove(email);
            await _context.SaveChangesAsync();

            return email;
        }

        private bool EmailExists(int id)
        {
            return _context.Email.Any(e => e.IdEmail == id);
        }
    }
}
