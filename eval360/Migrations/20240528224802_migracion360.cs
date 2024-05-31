using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Eval360.Migrations
{
    public partial class migracion360 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Colaboradores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    ApellidoPaterno = table.Column<string>(type: "text", nullable: false),
                    ApellidoMaterno = table.Column<string>(type: "text", nullable: false),
                    FechaNacimiento = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Genero = table.Column<string>(type: "text", nullable: false),
                    CURP = table.Column<string>(type: "text", nullable: false),
                    RFC = table.Column<string>(type: "text", nullable: false),
                    NumeroNomina = table.Column<string>(type: "text", nullable: false),
                    EstadoCivil = table.Column<string>(type: "text", nullable: false),
                    Nacionalidad = table.Column<string>(type: "text", nullable: false),
                    NSS = table.Column<string>(type: "text", nullable: false),
                    TipoSangre = table.Column<string>(type: "text", nullable: false),
                    Correo = table.Column<string>(type: "text", nullable: false),
                    CorreoInstitucional = table.Column<string>(type: "text", nullable: false),
                    Celular = table.Column<string>(type: "text", nullable: false),
                    Telefono = table.Column<string>(type: "text", nullable: false),
                    CodigoPostal = table.Column<string>(type: "text", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    Ciudad = table.Column<string>(type: "text", nullable: false),
                    Colonia = table.Column<string>(type: "text", nullable: false),
                    Calle = table.Column<string>(type: "text", nullable: false),
                    NoExterior = table.Column<int>(type: "integer", nullable: false),
                    NoInterior = table.Column<int>(type: "integer", nullable: false),
                    UsuarioERP = table.Column<bool>(type: "boolean", nullable: false),
                    HorarioId = table.Column<int>(type: "integer", nullable: false),
                    EstudioId = table.Column<int>(type: "integer", nullable: false),
                    PuestoId = table.Column<int>(type: "integer", nullable: false),
                    Activo = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Colaboradores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Competencias",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Descripcion = table.Column<string>(type: "text", nullable: false),
                    Color = table.Column<string>(type: "text", nullable: false),
                    Activo = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Competencias", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Criterios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NombreCompetencia = table.Column<string>(type: "text", nullable: false),
                    Orden = table.Column<int>(type: "integer", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Descripcion = table.Column<string>(type: "text", nullable: false),
                    Activo = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Criterios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Escalas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Opcion = table.Column<string>(type: "text", nullable: false),
                    Descripcion = table.Column<string>(type: "text", nullable: false),
                    Valor = table.Column<int>(type: "integer", nullable: false),
                    Icono = table.Column<int>(type: "integer", nullable: false),
                    Activo = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Escalas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Estudios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NivelEstudio = table.Column<string>(type: "text", nullable: false),
                    Titulo = table.Column<string>(type: "text", nullable: false),
                    Institucion = table.Column<string>(type: "text", nullable: false),
                    Estatus = table.Column<string>(type: "text", nullable: false),
                    Cedula = table.Column<string>(type: "text", nullable: false),
                    Colaborador = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estudios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Horarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Ciclo = table.Column<string>(type: "text", nullable: false),
                    Semestre = table.Column<string>(type: "text", nullable: false),
                    LunEnt = table.Column<int>(type: "integer", nullable: false),
                    LunSal = table.Column<int>(type: "integer", nullable: false),
                    MarEnt = table.Column<int>(type: "integer", nullable: false),
                    MarSal = table.Column<int>(type: "integer", nullable: false),
                    MieEnt = table.Column<int>(type: "integer", nullable: false),
                    MieSal = table.Column<int>(type: "integer", nullable: false),
                    JueEnt = table.Column<int>(type: "integer", nullable: false),
                    JueSal = table.Column<int>(type: "integer", nullable: false),
                    VieEnt = table.Column<int>(type: "integer", nullable: false),
                    VieSal = table.Column<int>(type: "integer", nullable: false),
                    UltimaMod = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ModificadoPor = table.Column<string>(type: "text", nullable: false),
                    Colaborador = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Horarios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Puestos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PuestoNombre = table.Column<string>(type: "text", nullable: false),
                    PuestoSuperior = table.Column<string>(type: "text", nullable: false),
                    FechaAsignacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    AsignadoPor = table.Column<string>(type: "text", nullable: false),
                    Antiguedad = table.Column<string>(type: "text", nullable: false),
                    Colaborador = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Puestos", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Colaboradores");

            migrationBuilder.DropTable(
                name: "Competencias");

            migrationBuilder.DropTable(
                name: "Criterios");

            migrationBuilder.DropTable(
                name: "Escalas");

            migrationBuilder.DropTable(
                name: "Estudios");

            migrationBuilder.DropTable(
                name: "Horarios");

            migrationBuilder.DropTable(
                name: "Puestos");
        }
    }
}
