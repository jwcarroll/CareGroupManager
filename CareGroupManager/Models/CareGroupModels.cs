using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;
using CareGroupManager.Validation;

namespace CareGroupManager.Models {
   public abstract class AuditableEntity
   {
      [Timestamp]
      public byte[] RowVersion { get; set; }

      public DateTimeOffset CreateDateTimeUtc { get; set; }

      public String CreatedByUserName { get; set; }

      public DateTimeOffset ModifiedDateTimeUtc { get; set; }

      public String ModifiedByUserName { get; set; }
   }

   public class Member: AuditableEntity
   {
      public int MemberId { get; set; }
      public bool IsCareGroupLeader { get; set; }
      [Index, Required, MaxLength(255)]
      public string FirstName { get; set; }
      [Index, Required, MaxLength(255)]
      public string LastName { get; set; }
      [Index, Required, EmailAddress, MaxLength(255)]
      public string Email { get; set; }
      [Phone, MaxLength(50)]
      public string HomePhone { get; set; }
      [Phone, MaxLength(50)]
      public string WorkPhone { get; set; }
      [Phone, MaxLength(50)]
      public string CellPhone { get; set; }
      [MaxLength(255)]
      public string Address { get; set; }
      [MaxLength(255)]
      public string City { get; set; }
      [MaxLength(255)]
      public string State { get; set; }
      [ZipCode(ErrorMessage = "The Zip field must be a valid US Zip Code")]
      public string Zip { get; set; }
      public int? CareGroupId { get; set; }
      public CareGroup CareGroup { get; set; }
   }

   public class CareGroup: AuditableEntity
   {
      public int CareGroupId { get; set; }
      [Index("IX_UniqueCareGroupName", IsUnique = true)]
      [Required, MaxLength(400)]
      public string Name { get; set; }
      public List<Member> Members { get; set; }
   }
}