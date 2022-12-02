using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class FourthCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Client_ClientRole_ClientRoleId",
                table: "Client");

            migrationBuilder.DropTable(
                name: "ClientRole");

            migrationBuilder.DropIndex(
                name: "IX_Client_ClientRoleId",
                table: "Client");

            migrationBuilder.DropColumn(
                name: "ClientRoleId",
                table: "Client");

            migrationBuilder.AddColumn<string>(
                name: "ClientRole",
                table: "Client",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientRole",
                table: "Client");

            migrationBuilder.AddColumn<int>(
                name: "ClientRoleId",
                table: "Client",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ClientRole",
                columns: table => new
                {
                    ClientRoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientRole", x => x.ClientRoleId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Client_ClientRoleId",
                table: "Client",
                column: "ClientRoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Client_ClientRole_ClientRoleId",
                table: "Client",
                column: "ClientRoleId",
                principalTable: "ClientRole",
                principalColumn: "ClientRoleId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
