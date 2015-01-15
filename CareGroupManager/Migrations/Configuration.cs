using CareGroupManager.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace CareGroupManager.Migrations
{
   using System;
   using System.Data.Entity;
   using System.Data.Entity.Migrations;
   using System.Linq;

   internal sealed class Configuration : DbMigrationsConfiguration<ApplicationDbContext>
   {
      public Configuration()
      {
         AutomaticMigrationsEnabled = false;
      }

      protected override void Seed(ApplicationDbContext context)
      {
         if (!context.Roles.Any(r => r.Name == "Admin"))
         {
            var store = new RoleStore<IdentityRole>(context);
            var manager = new RoleManager<IdentityRole>(store);
            var role = new IdentityRole {Name = "Admin"};
            
            manager.Create(role);
         }

         if (!context.Users.Any(u => u.UserName == "Admin"))
         {
            var store = new UserStore<ApplicationUser>(context);
            var manager = new UserManager<ApplicationUser>(store);
            var user = new ApplicationUser {UserName = "Admin"};
            
            manager.Create(user, "ChangeMe");
            manager.AddToRole(user.Id, "Admin");
         }
      }
   }
}
