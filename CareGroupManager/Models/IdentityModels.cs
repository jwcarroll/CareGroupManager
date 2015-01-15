using System;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;

namespace CareGroupManager.Models
{
   // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
   public class ApplicationUser : IdentityUser
   {
      public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager,
         string authenticationType)
      {
         // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
         var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
         // Add custom user claims here
         return userIdentity;
      }
   }

   public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
   {
      public DbSet<Member> Members { get; set; }

      public DbSet<CareGroup> CareGroups { get; set; }

      public ApplicationDbContext()
         : base("DefaultConnection", throwIfV1Schema: false)
      {
      }

      public static ApplicationDbContext Create()
      {
         return new ApplicationDbContext();
      }

      public override int SaveChanges()
      {
         SetAuditValues();

         return base.SaveChanges();
      }

      public override Task<int> SaveChangesAsync()
      {
         SetAuditValues();

         return base.SaveChangesAsync();
      }

      public override Task<int> SaveChangesAsync(CancellationToken cancellationToken)
      {
         SetAuditValues();

         return base.SaveChangesAsync(cancellationToken);
      }

      private void SetAuditValues()
      {
         var curUtc = DateTimeOffset.UtcNow;
         var curUserName = Thread.CurrentPrincipal.Identity.Name;

         foreach (var entity in ChangeTracker.Entries<AuditableEntity>())
         {
            if (entity.State == EntityState.Added)
            {
               entity.Property("CreateDateTimeUtc").CurrentValue = curUtc;
               entity.Property("CreatedByUserName").CurrentValue = curUserName;
            }

            if (entity.State == EntityState.Added || entity.State == EntityState.Modified)
            {
               entity.Property("ModifiedDateTimeUtc").CurrentValue = curUtc;
               entity.Property("ModifiedByUserName").CurrentValue = curUserName;
            }
         }
      }
   }
}