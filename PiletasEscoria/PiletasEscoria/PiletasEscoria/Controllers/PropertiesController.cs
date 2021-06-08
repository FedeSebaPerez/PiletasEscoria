using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PiletasEscoria.Models;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Text.Json;

namespace PiletasEscoria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertiesController : ControllerBase
    {
        private readonly Level3_SM_WastePoolContext _context;

        public PropertiesController(Level3_SM_WastePoolContext context)
        {
            _context = context;
        }

        // GET: api/Properties
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Property>>> GetProperty()
        {
            return await _context.Property.FromSqlRaw("[pool].[GetAllProperties]").ToListAsync();
        }

        // GET: api/Properties/GetPropertyById/5
        [HttpGet("GetPropertyById/{id}")]
        public async Task<ActionResult<Property>> GetProperty(int id)
        {
            var @property = await _context.Property.FindAsync(id);

            if (@property == null)
            {
                return NotFound();
            }

            return @property;
        }

        // PUT: api/Properties/UpdateProperty
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("UpdateProperty")]
        public async Task<ActionResult<int>> PutProperty([FromBody] Property @property)
        {
            {
                
                try
                {
                    await _context.Database.ExecuteSqlRawAsync("[Pool].[UpdateProperty] @IdProperty, @IdDataType, @Name, @IsActive",
                                                                new SqlParameter("@IdProperty", @property.IdProperty),
                                                                new SqlParameter("@IdDataType", @property.IdDataType),
                                                                new SqlParameter("@Name", @property.Name),
                                                                new SqlParameter("@IsActive", @property.Active));
                  
                    return 1;
                }

                catch
                {
                    return -1;
                }
            }

        }

        //public async Task<IActionResult> PutProperty(int id, Property @property)
        //{
        //    if (id != @property.IdProperty)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(@property).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!PropertyExists(id))
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

        // POST: api/Properties/AddProperty
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("AddProperty")]        
        public async Task<ActionResult<int>> PostProperty([FromBody] Property @property)
        {
            var id = new SqlParameter("@Id", SqlDbType.Int);
            id.Direction = ParameterDirection.InputOutput;
            id.Value = 0;
                   
            try
            {
               await _context.Database.ExecuteSqlRawAsync("[Pool].[AddProperty] @Name, @IdDataType, @IsActive, @Id",
                                                           new SqlParameter("@Name", @property.Name),
                                                           new SqlParameter("@IdDataType", @property.IdDataType),
                                                           new SqlParameter("@IsActive", @property.Active),
                                                           id);
                //_context.Property.Add(@property);
                //await _context.SaveChangesAsync();

                //return CreatedAtAction("GetProperty", new { id = @property.IdProperty }, @property);
                return 1;
            }

            catch
            {
                return -1;
            }            
        }

        // DELETE: api/Properties/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Property>> DeleteProperty(int id)
        {
            var @property = await _context.Property.FindAsync(id);
            if (@property == null)
            {
                return NotFound();
            }

            _context.Property.Remove(@property);
            await _context.SaveChangesAsync();

            return @property;
        }

        private bool PropertyExists(int id)
        {
            return _context.Property.Any(e => e.IdProperty == id);
        }

        //api/Properties/GetDataType
        [HttpGet("GetDataType")]        
        public async Task<ActionResult<IEnumerable<DataType>>> GetDataType()
        {
            return await _context.DataType.Where(d => d.IdDataType == 5 ||
                                                 d.IdDataType == 7 ||
                                                 d.IdDataType == 8).ToListAsync();

        }

    }
}
