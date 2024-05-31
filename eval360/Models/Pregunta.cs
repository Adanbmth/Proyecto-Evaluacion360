using System.Collections;

namespace Eval360.Models
{
    public class Pregunta
    {
        public int Id { get; set; }

        public string Preguntas { get; set; } = null!;

        public BitArray Activo { get; set; } = null!;
    }
}
