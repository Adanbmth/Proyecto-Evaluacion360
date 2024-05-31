using Eval360.Models;
using Microsoft.EntityFrameworkCore;

namespace Eval360.Context
{
    public class AplicationContext: DbContext
    {
        public AplicationContext(){}

        public AplicationContext(DbContextOptions<AplicationContext> options) : base(options){}

        public DbSet<EscalaEvaluacion> Escalas => Set<EscalaEvaluacion>();

        public DbSet<Competencia> Competencias => Set<Competencia>();

        public DbSet<Criterio> Criterios => Set<Criterio>();

        public DbSet<Colaborador> Colaboradores => Set<Colaborador>();

        public DbSet<Horario> Horarios => Set<Horario>();

        public DbSet<Estudio> Estudios => Set<Estudio>();

        public DbSet<Puesto> Puestos => Set<Puesto>();

    }
}
