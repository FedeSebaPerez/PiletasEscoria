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
    public class PoolActionsController : ControllerBase
    {
        private readonly Level3_SM_WastePoolContext _context;

        public PoolActionsController(Level3_SM_WastePoolContext context)
        {
            _context = context;
        }

        // GET: api/PoolActions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PoolAction>>> GetPoolAction()
        {
            return await _context.PoolAction.ToListAsync();
        }

        // GET: api/PoolActions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PoolAction>> GetPoolAction(int id)
        {
            var poolAction = await _context.PoolAction.FindAsync(id);

            if (poolAction == null)
            {
                return NotFound();
            }

            return poolAction;
        }

        // PUT: api/PoolActions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPoolAction(int id, PoolAction poolAction)
        {
            if (id != poolAction.IdPool)
            {
                return BadRequest();
            }

            _context.Entry(poolAction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PoolActionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PoolActions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PoolAction>> PostPoolAction(PoolAction poolAction)
        {
            _context.PoolAction.Add(poolAction);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PoolActionExists(poolAction.IdPool))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPoolAction", new { id = poolAction.IdPool }, poolAction);
        }

        // DELETE: api/PoolActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PoolAction>> DeletePoolAction(int id)
        {
            var poolAction = await _context.PoolAction.FindAsync(id);
            if (poolAction == null)
            {
                return NotFound();
            }

            _context.PoolAction.Remove(poolAction);
            await _context.SaveChangesAsync();

            return poolAction;
        }

        private bool PoolActionExists(int id)
        {
            return _context.PoolAction.Any(e => e.IdPool == id);
        }
    }
}
