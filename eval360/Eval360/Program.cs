using Eval360.Context;
using Eval360.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("PostgreConnection");
builder.Services.AddDbContext<AplicationContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddCors(policyBuilder => policyBuilder.AddDefaultPolicy(policy => policy.WithOrigins("*").AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

//Controladores para las escalas de evaluacion

app.MapGet("/ListarEscalas/", async (AplicationContext db) => await db.Escalas.ToListAsync());

app.MapGet("/BuscarEscala/{id:int}", async (int id, AplicationContext db) =>
{
    return await db.Escalas.FindAsync(id)
        is EscalaEvaluacion e
        ? Results.Ok(e)
        : Results.NotFound();
});

app.MapPost("/AgregarEscala/", async (EscalaEvaluacion e, AplicationContext db) =>
{
    db.Escalas.Add(e);
    await db.SaveChangesAsync();
    return Results.Created($"/AgregarEscala",e);
});

app.MapPut("/EditarEscala/{id:int}", async (int id, AplicationContext db, EscalaEvaluacion e) =>
{
    if (e.Id != id) return Results.BadRequest();
    var escala = await db.Escalas.FindAsync(id);
    if(escala is null) return Results.NotFound();
    escala.Opcion = e.Opcion;
    escala.Descripcion = e.Descripcion;
    escala.Valor = e.Valor;
    escala.Icono = e.Icono;
    escala.Activo = e.Activo;
    await db.SaveChangesAsync();
    return Results.Ok(escala);
});

app.MapDelete("/EliminarEscala/{id:int}", async(int id, AplicationContext db) => 
{
    var escala = await db.Escalas.FindAsync(id);
    if (escala is null) return Results.NotFound();
    {
        db.Escalas.Remove(escala);
        await db.SaveChangesAsync();
        return Results.Ok();
    }
    
});

//Controladores para las competencias
app.MapGet("/ListarCompetencias/", async (AplicationContext db) => await db.Competencias.ToListAsync());

app.MapGet("/BuscarCompetencia/{id:int}", async (int id, AplicationContext db) =>
{
    return await db.Competencias.FindAsync(id)
        is Competencia e
        ? Results.Ok(e)
        : Results.NotFound();
});

app.MapPost("/AgregarCompetencia/", async (Competencia e, AplicationContext db) =>
{
    db.Competencias.Add(e);
    await db.SaveChangesAsync();
    return Results.Created($"/AgregarEscala", e);
});

app.MapPut("/EditarCompetencia/{id:int}", async (int id, AplicationContext db, Competencia e) =>
{
    if (e.Id != id) return Results.BadRequest();
    var competencia = await db.Competencias.FindAsync(id);
    if (competencia is null) return Results.NotFound();
    competencia.Nombre = e.Nombre;
    competencia.Descripcion = e.Descripcion;
    competencia.Color = e.Color;
    competencia.Activo = e.Activo;
    await db.SaveChangesAsync();
    return Results.Ok(competencia);
});

app.MapDelete("/EliminarCompetencia/{id:int}", async (int id, AplicationContext db) =>
{
    var competencia = await db.Competencias.FindAsync(id);
    if (competencia is null) return Results.NotFound();
    {
        db.Competencias.Remove(competencia);
        await db.SaveChangesAsync();
        return Results.Ok();
    } 
});

//Controladores para los criterios

app.MapGet("/ListarCriterios", async (AplicationContext db) => await db.Criterios.ToListAsync());

app.MapGet("/BuscarCriterio/{id:int}", async (int id, AplicationContext db) =>
{
    return await db.Criterios.FindAsync(id)
        is Criterio e
        ? Results.Ok(e)
        : Results.NotFound();
});

app.MapPost("/AgregarCriterio/", async (Criterio e, AplicationContext db) =>
{
    db.Criterios.Add(e);
    await db.SaveChangesAsync();
    return Results.Created($"/AgregarCriterio", e);
});

app.MapPut("/EditarCriterio/{id:int}", async (int id, AplicationContext db, Criterio e) =>
{
    if (e.Id != id) return Results.BadRequest();
    var criterio = await db.Criterios.FindAsync(id);
    if (criterio is null) return Results.NotFound();
    criterio.NombreCompetencia = e.NombreCompetencia;
    criterio.Orden = e.Orden;
    criterio.Nombre = e.Nombre;
    criterio.Descripcion = e.Descripcion;
    criterio.Activo = e.Activo;
    await db.SaveChangesAsync();
    return Results.Ok(criterio);
});

app.MapDelete("/EliminarCriterio/{id:int}", async (int id, AplicationContext db) =>
{
    var criterio = await db.Criterios.FindAsync(id);
    if (criterio is null) return Results.NotFound();
    {
        db.Criterios.Remove(criterio);
        await db.SaveChangesAsync();
        return Results.Ok();
    }
});


//Controladores para los colaboradores

app.MapGet("/ListarColaboradores", async (AplicationContext db) => await db.Colaboradores.ToListAsync());

app.MapGet("/BuscarColaborador/{id:int}", async (int id, AplicationContext db) =>
{
    return await db.Colaboradores.FindAsync(id)
        is Colaborador e
        ? Results.Ok(e)
        : Results.NotFound();
});

app.MapPost("/AgregarColaborador/", async (Colaborador e, AplicationContext db) =>
{
    db.Colaboradores.Add(e);
    await db.SaveChangesAsync();
    return Results.Created($"/AgregarColaborador", e);
});

app.MapPut("/EditarColaborador/{id:int}", async (int id, AplicationContext db, Colaborador e) =>
{
    if (e.Id != id) return Results.BadRequest();
    var colaborador = await db.Colaboradores.FindAsync(id);
    if (colaborador is null) return Results.NotFound();
    colaborador.Nombre = e.Nombre;
    colaborador.ApellidoPaterno = e.ApellidoPaterno;
    colaborador.ApellidoMaterno = e.ApellidoMaterno;
    colaborador.FechaNacimiento = e.FechaNacimiento;
    colaborador.Genero = e.Genero;
    colaborador.CURP = e.CURP;
    colaborador.RFC = e.RFC;
    colaborador.NumeroNomina = e.NumeroNomina;
    colaborador.EstadoCivil = e.EstadoCivil;
    colaborador.Nacionalidad = e.Nacionalidad;
    colaborador.NSS = e.NSS;
    colaborador.TipoSangre = e.TipoSangre;
    colaborador.Correo = e.Correo;
    colaborador.CorreoInstitucional = e.CorreoInstitucional;
    colaborador.Celular = e.Celular;
    colaborador.Telefono = e.Telefono;
    colaborador.CodigoPostal = e.CodigoPostal;
    colaborador.Estado = e.Estado;
    colaborador.Ciudad = e.Ciudad;
    colaborador.Colonia = e.Colonia;
    colaborador.Calle = e.Calle;
    colaborador.NoExterior = e.NoExterior;
    colaborador.NoInterior = e.NoInterior;
    colaborador.UsuarioERP = e.UsuarioERP;
    colaborador.HorarioId = e.HorarioId;
    colaborador.EstudioId = e.EstudioId;
    colaborador.PuestoId = e.PuestoId;
    colaborador.Activo = e.Activo;
    await db.SaveChangesAsync();
    return Results.Ok(colaborador);
});

app.MapDelete("/EliminarColaborador/{id:int}", async (int id, AplicationContext db) =>
{
    var colaborador = await db.Colaboradores.FindAsync(id);
    if (colaborador is null) return Results.NotFound();
    {
        db.Colaboradores.Remove(colaborador);
        await db.SaveChangesAsync();
        return Results.Ok();
    }
});


//Controladores para los horarios

app.MapGet("/ListarHorarios", async (AplicationContext db) => await db.Horarios.ToListAsync());


app.MapGet("/BuscarHorario/{id:int}", async (int id, AplicationContext db) =>
{
    return await db.Horarios.FindAsync(id)
        is Horario e
        ? Results.Ok(e)
        : Results.NotFound();
});

app.MapGet("/HorariosPorColaborador/{colaborador:int}", async (int colaborador, AplicationContext db) =>
{
    var horarios = await db.Horarios.Where(h => h.Colaborador == colaborador).ToListAsync();
    return horarios.Any() ? Results.Ok(horarios) : Results.NotFound();
});

app.MapPost("/AgregarHorario/", async (Horario e, AplicationContext db) =>
{
    db.Horarios.Add(e);
    await db.SaveChangesAsync();
    return Results.Created($"/AgregarHorario", e);
});

app.MapPut("/EditarHorario/{id:int}", async (int id, AplicationContext db, Horario e) =>
{
    if (e.Id != id) return Results.BadRequest();
    var horario = await db.Horarios.FindAsync(id);
    if (horario is null) return Results.NotFound();
    horario.Ciclo = e.Ciclo;
    horario.Semestre = e.Semestre;
    horario.LunEnt = e.LunEnt;
    horario.LunSal = e.LunSal;
    horario.MarEnt = e.MarEnt;
    horario.MarSal = e.MarSal;
    horario.MieEnt = e.MieEnt;
    horario.MieSal = e.MieSal;
    horario.JueEnt = e.JueEnt;
    horario.JueSal = e.JueSal;
    horario.VieEnt = e.VieEnt;
    horario.VieSal = e.VieSal;
    horario.UltimaMod = e.UltimaMod;
    horario.ModificadoPor = e.ModificadoPor;
    await db.SaveChangesAsync();
    return Results.Ok(horario);
});

app.MapDelete("/EliminarHorario/{id:int}", async (int id, AplicationContext db) =>
{
    var horario = await db.Horarios.FindAsync(id);
    if (horario is null) return Results.NotFound();
    {
        db.Horarios.Remove(horario);
        await db.SaveChangesAsync();
        return Results.Ok();
    }
});


////Controladores para los estudios

app.MapGet("/ListarEstudios", async (AplicationContext db) => await db.Estudios.ToListAsync());

app.MapGet("/BuscarEstudio/{id:int}", async (int id, AplicationContext db) =>
{
    return await db.Estudios.FindAsync(id)
        is Estudio e
        ? Results.Ok(e)
        : Results.NotFound();
});

app.MapGet("/EstudiosPorColaborador/{colaborador:int}", async (int colaborador, AplicationContext db) =>
{
    var estudios = await db.Estudios.Where(h => h.Colaborador == colaborador).ToListAsync();
    return estudios.Any() ? Results.Ok(estudios) : Results.NotFound();
});

app.MapPost("/AgregarEstudio/", async (Estudio e, AplicationContext db) =>
{
    db.Estudios.Add(e);
    await db.SaveChangesAsync();
    return Results.Created($"/AgregarEstudio", e);
});

app.MapPut("/EditarEstudio/{id:int}", async (int id, AplicationContext db, Estudio e) =>
{
    if (e.Id != id) return Results.BadRequest();
    var estudio = await db.Estudios.FindAsync(id);
    if (estudio is null) return Results.NotFound();
    estudio.NivelEstudio = e.NivelEstudio;
    estudio.Titulo = e.Titulo;
    estudio.Institucion = e.Institucion;
    estudio.Estatus = e.Estatus;
    estudio.Cedula = e.Cedula;
    await db.SaveChangesAsync();
    return Results.Ok(estudio);
});

app.MapDelete("/EliminarEstudio/{id:int}", async (int id, AplicationContext db) =>
{
    var estudio = await db.Estudios.FindAsync(id);
    if (estudio is null) return Results.NotFound();
    {
        db.Estudios.Remove(estudio);
        await db.SaveChangesAsync();
        return Results.Ok();
    }
});


////Controladores para los puestos

app.MapGet("/ListarPuestos", async (AplicationContext db) => await db.Puestos.ToListAsync());

app.MapGet("/BuscarPuesto/{id:int}", async (int id, AplicationContext db) =>
{
    return await db.Puestos.FindAsync(id)
        is Puesto e
        ? Results.Ok(e)
        : Results.NotFound();
});

app.MapGet("/PuestosPorColaborador/{colaborador:int}", async (int colaborador, AplicationContext db) =>
{
    var puestos = await db.Puestos.Where(h => h.Colaborador == colaborador).ToListAsync();
    return puestos.Any() ? Results.Ok(puestos) : Results.NotFound();
});

app.MapPost("/AgregarPuesto/", async (Puesto e, AplicationContext db) =>
{
    db.Puestos.Add(e);
    await db.SaveChangesAsync();
    return Results.Created($"/AgregarPuesto", e);
});

app.MapPut("/EditarPuesto/{id:int}", async (int id, AplicationContext db, Puesto e) =>
{
    if (e.Id != id) return Results.BadRequest();
    var puesto = await db.Puestos.FindAsync(id);
    if (puesto is null) return Results.NotFound();
    puesto.PuestoNombre = e.PuestoNombre;
    puesto.PuestoSuperior = e.PuestoSuperior;
    puesto.FechaAsignacion = e.FechaAsignacion;
    puesto.AsignadoPor = e.AsignadoPor;
    puesto.Antiguedad = e.Antiguedad;
    await db.SaveChangesAsync();
    return Results.Ok(puesto);
});

app.MapDelete("/EliminarPuesto/{id:int}", async (int id, AplicationContext db) =>
{
    var puesto = await db.Puestos.FindAsync(id);
    if (puesto is null) return Results.NotFound();
    {
        db.Puestos.Remove(puesto);
        await db.SaveChangesAsync();
        return Results.Ok();
    }
});

app.Run();

