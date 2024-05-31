﻿// <auto-generated />
using System;
using Eval360.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Eval360.Migrations
{
    [DbContext(typeof(AplicationContext))]
    partial class AplicationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.22")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Eval360.Models.Colaborador", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("Activo")
                        .HasColumnType("boolean");

                    b.Property<string>("ApellidoMaterno")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ApellidoPaterno")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CURP")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Calle")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Celular")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Ciudad")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CodigoPostal")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Colonia")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Correo")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CorreoInstitucional")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Estado")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("EstadoCivil")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("EstudioId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("FechaNacimiento")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Genero")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("HorarioId")
                        .HasColumnType("integer");

                    b.Property<string>("NSS")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Nacionalidad")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("NoExterior")
                        .HasColumnType("integer");

                    b.Property<int>("NoInterior")
                        .HasColumnType("integer");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("NumeroNomina")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("PuestoId")
                        .HasColumnType("integer");

                    b.Property<string>("RFC")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Telefono")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("TipoSangre")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("UsuarioERP")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.ToTable("Colaboradores");
                });

            modelBuilder.Entity("Eval360.Models.Competencia", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("Activo")
                        .HasColumnType("boolean");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Competencias");
                });

            modelBuilder.Entity("Eval360.Models.Criterio", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("Activo")
                        .HasColumnType("boolean");

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("NombreCompetencia")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Orden")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Criterios");
                });

            modelBuilder.Entity("Eval360.Models.EscalaEvaluacion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("Activo")
                        .HasColumnType("boolean");

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Icono")
                        .HasColumnType("integer");

                    b.Property<string>("Opcion")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Valor")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Escalas");
                });

            modelBuilder.Entity("Eval360.Models.Estudio", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Cedula")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Colaborador")
                        .HasColumnType("integer");

                    b.Property<string>("Estatus")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Institucion")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("NivelEstudio")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Titulo")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Estudios");
                });

            modelBuilder.Entity("Eval360.Models.Horario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Ciclo")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Colaborador")
                        .HasColumnType("integer");

                    b.Property<int>("JueEnt")
                        .HasColumnType("integer");

                    b.Property<int>("JueSal")
                        .HasColumnType("integer");

                    b.Property<int>("LunEnt")
                        .HasColumnType("integer");

                    b.Property<int>("LunSal")
                        .HasColumnType("integer");

                    b.Property<int>("MarEnt")
                        .HasColumnType("integer");

                    b.Property<int>("MarSal")
                        .HasColumnType("integer");

                    b.Property<int>("MieEnt")
                        .HasColumnType("integer");

                    b.Property<int>("MieSal")
                        .HasColumnType("integer");

                    b.Property<string>("ModificadoPor")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Semestre")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UltimaMod")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("VieEnt")
                        .HasColumnType("integer");

                    b.Property<int>("VieSal")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Horarios");
                });

            modelBuilder.Entity("Eval360.Models.Puesto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Antiguedad")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("AsignadoPor")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Colaborador")
                        .HasColumnType("integer");

                    b.Property<DateTime>("FechaAsignacion")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("PuestoNombre")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PuestoSuperior")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Puestos");
                });
#pragma warning restore 612, 618
        }
    }
}
