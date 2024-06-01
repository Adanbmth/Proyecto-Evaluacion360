namespace Eval360.Models
{
    public class Puesto
    {
        public int Id { get; set; }

        public string PuestoNombre { get; set; }

        public string PuestoSuperior { get; set; }

        public DateTime FechaAsignacion { get; set; }

        public string AsignadoPor { get; set; }

        public string Antiguedad { get; set; }

        public int Colaborador { get; set; }
    }
}
