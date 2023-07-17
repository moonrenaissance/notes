using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web_API.Migrations
{
    /// <inheritdoc />
    public partial class altercontext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NotesTags_Notes_TagId",
                table: "NotesTags");

            migrationBuilder.DropForeignKey(
                name: "FK_NotesTags_Tags_NoteId",
                table: "NotesTags");

            migrationBuilder.AddForeignKey(
                name: "FK_NotesTags_Notes_NoteId",
                table: "NotesTags",
                column: "NoteId",
                principalTable: "Notes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_NotesTags_Tags_TagId",
                table: "NotesTags",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NotesTags_Notes_NoteId",
                table: "NotesTags");

            migrationBuilder.DropForeignKey(
                name: "FK_NotesTags_Tags_TagId",
                table: "NotesTags");

            migrationBuilder.AddForeignKey(
                name: "FK_NotesTags_Notes_TagId",
                table: "NotesTags",
                column: "TagId",
                principalTable: "Notes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_NotesTags_Tags_NoteId",
                table: "NotesTags",
                column: "NoteId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
