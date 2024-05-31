export interface ListaHorario{
    id?: number;
    ciclo?: string | undefined;
    semestre?: string | undefined;
    lunEnt?: number;
    lunSal?: number;
    marEnt?: number;
    marSal?: number;
    mieEnt?: number;
    mieSal?: number;
    jueEnt?: number;
    jueSal?: number;
    vieEnt?: number;
    vieSal?: number;
    ultimaMod?: Date | string | null;
    modificadoPor?: string | undefined;
    colaborador?: number;
}