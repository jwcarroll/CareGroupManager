namespace CareGroupManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CareGroupTables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CareGroups",
                c => new
                    {
                        CareGroupId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 400),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                        CreateDateTimeUtc = c.DateTimeOffset(nullable: false, precision: 7),
                        CreatedByUserName = c.String(),
                        ModifiedDateTimeUtc = c.DateTimeOffset(nullable: false, precision: 7),
                        ModifiedByUserName = c.String(),
                    })
                .PrimaryKey(t => t.CareGroupId)
                .Index(t => t.Name, unique: true, name: "IX_UniqueCareGroupName");
            
            CreateTable(
                "dbo.Members",
                c => new
                    {
                        MemberId = c.Int(nullable: false, identity: true),
                        IsCareGroupLeader = c.Boolean(nullable: false),
                        FirstName = c.String(nullable: false, maxLength: 255),
                        LastName = c.String(nullable: false, maxLength: 255),
                        Email = c.String(nullable: false, maxLength: 255),
                        HomePhone = c.String(maxLength: 50),
                        WorkPhone = c.String(maxLength: 50),
                        CellPhone = c.String(maxLength: 50),
                        Address = c.String(maxLength: 255),
                        City = c.String(maxLength: 255),
                        State = c.String(maxLength: 255),
                        Zip = c.String(),
                        CareGroupId = c.Int(),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                        CreateDateTimeUtc = c.DateTimeOffset(nullable: false, precision: 7),
                        CreatedByUserName = c.String(),
                        ModifiedDateTimeUtc = c.DateTimeOffset(nullable: false, precision: 7),
                        ModifiedByUserName = c.String(),
                    })
                .PrimaryKey(t => t.MemberId)
                .ForeignKey("dbo.CareGroups", t => t.CareGroupId)
                .Index(t => t.FirstName)
                .Index(t => t.LastName)
                .Index(t => t.Email)
                .Index(t => t.CareGroupId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Members", "CareGroupId", "dbo.CareGroups");
            DropIndex("dbo.Members", new[] { "CareGroupId" });
            DropIndex("dbo.Members", new[] { "Email" });
            DropIndex("dbo.Members", new[] { "LastName" });
            DropIndex("dbo.Members", new[] { "FirstName" });
            DropIndex("dbo.CareGroups", "IX_UniqueCareGroupName");
            DropTable("dbo.Members");
            DropTable("dbo.CareGroups");
        }
    }
}
