using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class FifthCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientTrip");

            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "Trip",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Trip_ClientId",
                table: "Trip",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trip_Client_ClientId",
                table: "Trip",
                column: "ClientId",
                principalTable: "Client",
                principalColumn: "ClientId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trip_Client_ClientId",
                table: "Trip");

            migrationBuilder.DropIndex(
                name: "IX_Trip_ClientId",
                table: "Trip");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Trip");

            migrationBuilder.CreateTable(
                name: "ClientTrip",
                columns: table => new
                {
                    ClientTripId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientId = table.Column<int>(type: "int", nullable: false),
                    TripId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientTrip", x => x.ClientTripId);
                    table.ForeignKey(
                        name: "FK_ClientTrip_Client_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Client",
                        principalColumn: "ClientId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientTrip_Trip_TripId",
                        column: x => x.TripId,
                        principalTable: "Trip",
                        principalColumn: "TripId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClientTrip_ClientId",
                table: "ClientTrip",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientTrip_TripId",
                table: "ClientTrip",
                column: "TripId");
        }
    }
}
