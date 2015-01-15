using System;
using System.ComponentModel.DataAnnotations;

namespace CareGroupManager.Validation
{
   internal static class Patterns
   {
      public const String USZipCode = "^\\d{5}(?:[-\\s]\\d{4})?$";
   }

   internal class ZipCodeAttribute : RegularExpressionAttribute
   {
      public ZipCodeAttribute() : base(Patterns.USZipCode)
      {
      }
   }
}