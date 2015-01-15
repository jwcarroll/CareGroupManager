using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.OData.Builder;
using System.Web.OData.Extensions;
using CareGroupManager.Models;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace CareGroupManager
{
   public static class WebApiConfig
   {
      public static void Register(HttpConfiguration config)
      {
         var formatters = GlobalConfiguration.Configuration.Formatters;
         var jsonFormatter = formatters.JsonFormatter;
         var settings = jsonFormatter.SerializerSettings;
         settings.Formatting = Formatting.Indented;
         settings.ContractResolver = new CamelCasePropertyNamesContractResolver();

         // Web API configuration and services
         // Configure Web API to use only bearer token authentication.
         config.SuppressDefaultHostAuthentication();
         config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

         // Web API routes
         config.MapHttpAttributeRoutes();

         config.Routes.MapHttpRoute(
            name: "DefaultApi",
            routeTemplate: "api/{controller}/{id}",
            defaults: new {id = RouteParameter.Optional}
            );
      }
   }
}