namespace Eval360.Models
{
    public class Colaborador
    {
        public int Id { get; set; }

        public string Nombre { get; set; }

        public string ApellidoPaterno { get; set; }

        public string ApellidoMaterno { get; set; }

        public DateTime FechaNacimiento { get; set; }

        public string Genero { get; set; }

        public string CURP { get; set; }

        public string RFC { get; set; }

        public string NumeroNomina { get; set; }

        public string EstadoCivil { get; set; }

        public string Nacionalidad { get; set; }

        public string NSS { get; set; }

        public string TipoSangre { get; set; }

        public string Correo { get; set; }

        public string CorreoInstitucional { get; set; }

        public string Celular { get; set; }

        public string Telefono { get; set; }

        public string CodigoPostal { get; set; }

        public string Estado { get; set; }

        public string Ciudad { get; set; }

        public string Colonia { get; set; }

        public string Calle { get; set; }

        public int NoExterior { get; set; }

        public int NoInterior { get; set; }

        public Boolean UsuarioERP { get; set; }

        public int HorarioId { get; set; }

        public int EstudioId { get; set; }

        public int PuestoId {  get; set; }

        public Boolean Activo { get; set; }
    }
}
