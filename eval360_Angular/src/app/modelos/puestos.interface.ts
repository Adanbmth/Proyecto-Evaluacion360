export interface ListaPuesto{
    id?: number;
    puestoNombre?: string | undefined;
    puestoSuperior?: string | undefined;
    fechaAsignacion?: Date | string | null;
    asignadoPor?: string | undefined;
    antiguedad?: string | undefined;
    colaborador?: number | undefined;
}