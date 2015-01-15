using System.Configuration;
using System.Web;
using System.Web.Optimization;

namespace CareGroupManager {
   public class BundleConfig {
      // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
      public static void RegisterBundles(BundleCollection bundles) {
         bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                     "~/Scripts/lib/jquery/dist/jquery.js"));

         // Use the development version of Modernizr to develop with and learn from. Then, when you're
         // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
         bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                     "~/Scripts/lib/modernizr/modernizr.js"));

         bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                   "~/Scripts/lib/bootstrap/dist/js/bootstrap.js",
                   "~/Scripts/lib/respond/dest/respond.min.js"));

         bundles.Add(new ScriptBundle("~/bundles/angular", "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min.js")
            .Include("~/Scripts/lib/angular/angular.js"));
         bundles.Add(new ScriptBundle("~/bundles/angular-route", "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-route.min.js")
            .Include("~/Scripts/lib/angular-route/angular-route.js"));
         bundles.Add(new ScriptBundle("~/bundles/angular-animate", "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-animate.min.js")
            .Include("~/Scripts/lib/angular-animate/angular-animate.js"));
         bundles.Add(new ScriptBundle("~/bundles/angular-messages", "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-messages.min.js")
            .Include("~/Scripts/lib/angular-messages/angular-messages.js"));

         bundles.Add(new ScriptBundle("~/bundles/tools").Include(
            "~/Scripts/lib/angular-local-storage/dist/angular-local-storage.js",
            "~/Scripts/lib/lodash/dist/lodash.js",
            "~/Scripts/lib/angular-bootstrap/ui-bootstrap.js",
            "~/Scripts/lib/angular-bootstrap/ui-bootstrap-tpls.js"));

         bundles.Add(new ScriptBundle("~/bundles/app").Include(
            "~/Scripts/app/care-group-application.js",
            "~/Scripts/app/controllers/main.js",
            "~/Scripts/app/controllers/navigation.js",
            "~/Scripts/app/controllers/login.js",
            "~/Scripts/app/controllers/memberList.js",
            "~/Scripts/app/controllers/member.js",
            "~/Scripts/app/controllers/deleteMember.js",
            "~/Scripts/app/controllers/careGroups.js",
            "~/Scripts/app/controllers/createCareGroup.js",
            "~/Scripts/app/services/account.js",
            "~/Scripts/app/services/userSession.js",
            "~/Scripts/app/services/members.js",
            "~/Scripts/app/services/careGroups.js",
            "~/Scripts/app/directives/username.js",
            "~/Scripts/app/directives/requireLogin.js",
            "~/Scripts/app/directives/notificationBar.js",
            "~/Scripts/app/directives/modelState.js",
            "~/Scripts/app/interceptors/security.js",
            "~/Scripts/app/interceptors/error.js"));

         bundles.Add(new StyleBundle("~/Content/font-awesome", "//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css")
            .Include("~/Scripts/lib/font-awesome/css/font-awesome.css"));

         bundles.Add(new StyleBundle("~/Content/css").Include(
                   "~/Scripts/lib/bootstrap/dist/css/bootstrap.css",
                   "~/Scripts/lib/angular/angular-csp.css",
                   "~/Content/site.css"));

         bundles.UseCdn = true;

         // Set EnableOptimizations to false for debugging. For more information,
         // visit http://go.microsoft.com/fwlink/?LinkId=301862
         BundleTable.EnableOptimizations = ShouldOptimizeAssets();
      }

      private static bool ShouldOptimizeAssets()
      {
         var val = ConfigurationManager.AppSettings["OptimizeAssets"];

         return val == "true";
      }
   }
}
