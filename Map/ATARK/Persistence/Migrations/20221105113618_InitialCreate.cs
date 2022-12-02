using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.CreateTable(
                name: "Interval",
                columns: table => new
                {
                    IntervalId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IntervalNumber = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Interval", x => x.IntervalId);
                });

            migrationBuilder.CreateTable(
                name: "Period",
                columns: table => new
                {
                    PeriodId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TimeFrom = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TimeTo = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Period", x => x.PeriodId);
                });

            migrationBuilder.CreateTable(
                name: "Road",
                columns: table => new
                {
                    RoadId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DestinationX = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DestinationY = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CoordinatesXa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CoordinatesXb = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CoordinatesYa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CoordinatesYb = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Road", x => x.RoadId);
                });

            migrationBuilder.CreateTable(
                name: "Transport",
                columns: table => new
                {
                    TransportId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TransportNumber = table.Column<int>(type: "int", nullable: false),
                    Speed = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    CityId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transport", x => x.TransportId);
                    table.ForeignKey(
                        name: "FK_Transport_City_CityId",
                        column: x => x.CityId,
                        principalTable: "City",
                        principalColumn: "CityId");
                });

            migrationBuilder.CreateTable(
                name: "Client",
                columns: table => new
                {
                    ClientId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientRoleId = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Client", x => x.ClientId);
                    table.ForeignKey(
                        name: "FK_Client_ClientRole_ClientRoleId",
                        column: x => x.ClientRoleId,
                        principalTable: "ClientRole",
                        principalColumn: "ClientRoleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Line",
                columns: table => new
                {
                    LineId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LineColor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PeriodId = table.Column<int>(type: "int", nullable: true),
                    IntervalId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Line", x => x.LineId);
                    table.ForeignKey(
                        name: "FK_Line_Interval_IntervalId",
                        column: x => x.IntervalId,
                        principalTable: "Interval",
                        principalColumn: "IntervalId");
                    table.ForeignKey(
                        name: "FK_Line_Period_PeriodId",
                        column: x => x.PeriodId,
                        principalTable: "Period",
                        principalColumn: "PeriodId");
                });

            migrationBuilder.CreateTable(
                name: "Trip",
                columns: table => new
                {
                    TripId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TransportId = table.Column<int>(type: "int", nullable: false),
                    RoadId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trip", x => x.TripId);
                    table.ForeignKey(
                        name: "FK_Trip_Road_RoadId",
                        column: x => x.RoadId,
                        principalTable: "Road",
                        principalColumn: "RoadId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Trip_Transport_TransportId",
                        column: x => x.TransportId,
                        principalTable: "Transport",
                        principalColumn: "TransportId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Station",
                columns: table => new
                {
                    StationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StationName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LineId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Station", x => x.StationId);
                    table.ForeignKey(
                        name: "FK_Station_Line_LineId",
                        column: x => x.LineId,
                        principalTable: "Line",
                        principalColumn: "LineId",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateTable(
                name: "Timetable",
                columns: table => new
                {
                    TimetableId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StationId = table.Column<int>(type: "int", nullable: false),
                    Beginning = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Ending = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TransportId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Timetable", x => x.TimetableId);
                    table.ForeignKey(
                        name: "FK_Timetable_Station_StationId",
                        column: x => x.StationId,
                        principalTable: "Station",
                        principalColumn: "StationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Timetable_Transport_TransportId",
                        column: x => x.TransportId,
                        principalTable: "Transport",
                        principalColumn: "TransportId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Client_ClientRoleId",
                table: "Client",
                column: "ClientRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientTrip_ClientId",
                table: "ClientTrip",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientTrip_TripId",
                table: "ClientTrip",
                column: "TripId");

            migrationBuilder.CreateIndex(
                name: "IX_Line_IntervalId",
                table: "Line",
                column: "IntervalId");

            migrationBuilder.CreateIndex(
                name: "IX_Line_PeriodId",
                table: "Line",
                column: "PeriodId");

            migrationBuilder.CreateIndex(
                name: "IX_Station_LineId",
                table: "Station",
                column: "LineId");

            migrationBuilder.CreateIndex(
                name: "IX_Timetable_StationId",
                table: "Timetable",
                column: "StationId");

            migrationBuilder.CreateIndex(
                name: "IX_Timetable_TransportId",
                table: "Timetable",
                column: "TransportId");

            migrationBuilder.CreateIndex(
                name: "IX_Transport_CityId",
                table: "Transport",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Trip_RoadId",
                table: "Trip",
                column: "RoadId");

            migrationBuilder.CreateIndex(
                name: "IX_Trip_TransportId",
                table: "Trip",
                column: "TransportId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientTrip");

            migrationBuilder.DropTable(
                name: "Timetable");

            migrationBuilder.DropTable(
                name: "Client");

            migrationBuilder.DropTable(
                name: "Trip");

            migrationBuilder.DropTable(
                name: "Station");

            migrationBuilder.DropTable(
                name: "ClientRole");

            migrationBuilder.DropTable(
                name: "Road");

            migrationBuilder.DropTable(
                name: "Transport");

            migrationBuilder.DropTable(
                name: "Line");

            migrationBuilder.DropTable(
                name: "City");

            migrationBuilder.DropTable(
                name: "Interval");

            migrationBuilder.DropTable(
                name: "Period");
        }
    }
}
