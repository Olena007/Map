using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class ThirdCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transport_City_CityId",
                table: "Transport");

            migrationBuilder.DropTable(
                name: "City");

            migrationBuilder.DropIndex(
                name: "IX_Transport_CityId",
                table: "Transport");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "Transport");

            migrationBuilder.AddColumn<string>(
                name: "CitName",
                table: "Transport",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CitName",
                table: "Transport");

            migrationBuilder.AddColumn<int>(
                name: "CityId",
                table: "Transport",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "City",
                columns: table => new
                {
                    CityId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CityName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Index = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_City", x => x.CityId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Transport_CityId",
                table: "Transport",
                column: "CityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transport_City_CityId",
                table: "Transport",
                column: "CityId",
                principalTable: "City",
                principalColumn: "CityId");
        }
    }
}
