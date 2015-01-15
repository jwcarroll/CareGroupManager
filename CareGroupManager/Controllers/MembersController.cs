using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.OData;
using System.Web.OData.Extensions;
using System.Web.OData.Query;
using CareGroupManager.Models;

namespace CareGroupManager.Controllers
{
   [Authorize]
   public class MembersController: ApiController
   {
      private ApplicationDbContext db = new ApplicationDbContext();

      // GET: api/Members
      public PageResult<Member> GetMembers(ODataQueryOptions<Member> options)
      {
         var settings = new ODataQuerySettings
                        {
                           PageSize = 10
                        };

         var results = options.ApplyTo(db.Members.AsQueryable(), settings);

         return new PageResult<Member>(
            results as IEnumerable<Member>,
            Request.ODataProperties().NextLink,
            Request.ODataProperties().TotalCount);
      }

      // GET: api/Members/5
      public async Task<IHttpActionResult> GetMember(int id)
      {
         var member = await db.Members.FindAsync(id);
         
         if (member == null) {
            return NotFound();
         }

         return Ok(member);
      }

      // PUT: api/Members/5
      [ResponseType(typeof (void))]
      public async Task<IHttpActionResult> PutMember(int id, Member member)
      {
         if (!ModelState.IsValid)
         {
            return BadRequest(ModelState);
         }

         if (id != member.MemberId)
         {
            return BadRequest();
         }

         db.Entry(member).State = EntityState.Modified;

         try
         {
            await db.SaveChangesAsync();
         }
         catch (DbUpdateConcurrencyException)
         {
            if (!MemberExists(id))
            {
               return NotFound();
            }

            throw;
         }

         return StatusCode(HttpStatusCode.NoContent);
      }

      // POST: api/Members
      [ResponseType(typeof (Member))]
      public async Task<IHttpActionResult> PostMember(Member member)
      {
         if (!ModelState.IsValid)
         {
            return BadRequest(ModelState);
         }

         db.Members.Add(member);
         await db.SaveChangesAsync();

         return CreatedAtRoute("DefaultApi", new {id = member.MemberId}, member);
      }

      // DELETE: api/Members/5
      [ResponseType(typeof (Member))]
      public async Task<IHttpActionResult> DeleteMember(int id)
      {
         Member member = await db.Members.FindAsync(id);
         if (member == null)
         {
            return NotFound();
         }

         db.Members.Remove(member);
         await db.SaveChangesAsync();

         return Ok(member);
      }

      protected override void Dispose(bool disposing)
      {
         if (disposing)
         {
            db.Dispose();
         }
         base.Dispose(disposing);
      }

      private bool MemberExists(int id)
      {
         return db.Members.Count(e => e.MemberId == id) > 0;
      }
   }
}