using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class EightCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Station_Line_LineId",
                table: "Station");

            migrationBuilder.DropIndex(
                name: "IX_Station_LineId",
                table: "Station");

            migrationBuilder.DropColumn(
                name: "LineId",
                table: "Station");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LineId",
                table: "Station",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Station_LineId",
                table: "Station",
                column: "LineId");

            migrationBuilder.AddForeignKey(
                name: "FK_Station_Line_LineId",
                table: "Station",
                column: "LineId",
                principalTable: "Line",
                principalColumn: "LineId");
        }
    }
}
