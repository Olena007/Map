using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class SeventhCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoordinatesXa",
                table: "Station");

            migrationBuilder.DropColumn(
                name: "CoordinatesXb",
                table: "Station");

            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Station",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Station",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Station");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Station");

            migrationBuilder.AddColumn<string>(
                name: "CoordinatesXa",
                table: "Station",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CoordinatesXb",
                table: "Station",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
