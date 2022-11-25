using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class NinethCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StationIdX",
                table: "Road");

            migrationBuilder.DropColumn(
                name: "StationIdY",
                table: "Road");

            migrationBuilder.AddColumn<string>(
                name: "StationNameX",
                table: "Road",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "StationNameY",
                table: "Road",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StationNameX",
                table: "Road");

            migrationBuilder.DropColumn(
                name: "StationNameY",
                table: "Road");

            migrationBuilder.AddColumn<int>(
                name: "StationIdX",
                table: "Road",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StationIdY",
                table: "Road",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
