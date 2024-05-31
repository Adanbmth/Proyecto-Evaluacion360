namespace Eval360.Models
{
    public class Horario
    {
        public int Id { get; set; }

        public string Ciclo { get; set; }

        public string Semestre { get; set; }

        public int LunEnt { get; set; } 

        public int LunSal { get; set; }

        public int MarEnt { get; set; }

        public int MarSal { get; set; }

        public int MieEnt { get; set; }

        public int MieSal { get; set; }

        public int JueEnt { get; set; }

        public int JueSal { get; set; }

        public int VieEnt { get; set; }

        public int VieSal { get; set; }

        public DateTime UltimaMod { get; set; }

        public string ModificadoPor { get; set; }

        public int Colaborador {  get; set; }
    }
}
