using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.OData;
using System.Web.OData.Extensions;
using System.Web.OData.Query;
using System.Web.Routing;
using CareGroupManager.Models;

namespace CareGroupManager.Controllers
{
   [Authorize]
   [RoutePrefix("api")]
   public class CareGroupsController : ApiController
   {
      private ApplicationDbContext db = new ApplicationDbContext();

      // GET: api/CareGroups
      public PageResult<CareGroup> GetCareGroups(ODataQueryOptions<CareGroup> options)
      {
         var settings = new ODataQuerySettings {
            PageSize = 100
         };

         var results = options.ApplyTo(db.CareGroups.AsQueryable(), settings);

         return new PageResult<CareGroup>(
            results as IEnumerable<CareGroup>,
            Request.ODataProperties().NextLink,
            Request.ODataProperties().TotalCount);
      }

      [Route("caregroups/{careGroupId}/members")]
      public PageResult<Member> GetCareGroupMembers(int careGroupId, ODataQueryOptions<Member> options)
      {
         var settings = new ODataQuerySettings {
            PageSize = 10
         };

         var results = options.ApplyTo(
            db.Members
               .Where(m => m.CareGroupId == careGroupId)
               .AsQueryable(), settings);

         return new PageResult<Member>(
            results as IEnumerable<Member>,
            Request.ODataProperties().NextLink,
            Request.ODataProperties().TotalCount);
      }

         // GET: api/CareGroups/5
      [ResponseType(typeof (CareGroup))]
      public async Task<IHttpActionResult> GetCareGroup(int id)
      {
         CareGroup careGroup = await db.CareGroups.FindAsync(id);
         if (careGroup == null)
         {
            return NotFound();
         }

         return Ok(careGroup);
      }

      // PUT: api/CareGroups/5
      [ResponseType(typeof (void))]
      public async Task<IHttpActionResult> PutCareGroup(int id, CareGroup careGroup)
      {
         if (!ModelState.IsValid)
         {
            return BadRequest(ModelState);
         }

         if (id != careGroup.CareGroupId)
         {
            return BadRequest();
         }

         db.Entry(careGroup).State = EntityState.Modified;

         try
         {
            await db.SaveChangesAsync();
         }
         catch (DbUpdateConcurrencyException)
         {
            if (!CareGroupExists(id))
            {
               return NotFound();
            }
            else
            {
               throw;
            }
         }

         return StatusCode(HttpStatusCode.NoContent);
      }

      // POST: api/CareGroups
      [ResponseType(typeof (CareGroup))]
      public async Task<IHttpActionResult> PostCareGroup(CareGroup careGroup)
      {
         if (!ModelState.IsValid)
         {
            return BadRequest(ModelState);
         }

         db.CareGroups.Add(careGroup);
         await db.SaveChangesAsync();

         return CreatedAtRoute("DefaultApi", new {id = careGroup.CareGroupId}, careGroup);
      }

      // DELETE: api/CareGroups/5
      [ResponseType(typeof (CareGroup))]
      public async Task<IHttpActionResult> DeleteCareGroup(int id)
      {
         CareGroup careGroup = await db.CareGroups.FindAsync(id);
         if (careGroup == null)
         {
            return NotFound();
         }

         db.CareGroups.Remove(careGroup);
         await db.SaveChangesAsync();

         return Ok(careGroup);
      }

      protected override void Dispose(bool disposing)
      {
         if (disposing)
         {
            db.Dispose();
         }
         base.Dispose(disposing);
      }

      private bool CareGroupExists(int id)
      {
         return db.CareGroups.Count(e => e.CareGroupId == id) > 0;
      }
   }
}