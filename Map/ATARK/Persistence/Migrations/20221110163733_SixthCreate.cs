using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class SixthCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoordinatesXa",
                table: "Road");

            migrationBuilder.DropColumn(
                name: "CoordinatesXb",
                table: "Road");

            migrationBuilder.DropColumn(
                name: "CoordinatesYa",
                table: "Road");

            migrationBuilder.DropColumn(
                name: "CoordinatesYb",
                table: "Road");

            migrationBuilder.DropColumn(
                name: "DestinationX",
                table: "Road");

            migrationBuilder.DropColumn(
                name: "DestinationY",
                table: "Road");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoordinatesXa",
                table: "Station");

            migrationBuilder.DropColumn(
                name: "CoordinatesXb",
                table: "Station");

            migrationBuilder.DropColumn(
                name: "StationIdX",
                table: "Road");

            migrationBuilder.DropColumn(
                name: "StationIdY",
                table: "Road");

            migrationBuilder.AddColumn<string>(
                name: "CoordinatesXa",
                table: "Road",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CoordinatesXb",
                table: "Road",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CoordinatesYa",
                table: "Road",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CoordinatesYb",
                table: "Road",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DestinationX",
                table: "Road",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DestinationY",
                table: "Road",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
