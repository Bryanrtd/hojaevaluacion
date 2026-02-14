import { min, required, schema } from "@angular/forms/signals";

export type TipificacionSanguinea = 'O+' | 'O-' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'Desconocida';


export interface GeneralInfo {
    paciente: string;
    edad: number;
    expediente: string;
    fechaEvaluacion: Date;
    natural: string;
    residente: string;

    tipificacion: TipificacionSanguinea;
}

export const generalInfoInitialData: GeneralInfo = {
    paciente: '',
    edad: Number.NaN,
    expediente: '',
    fechaEvaluacion: new Date,
    natural: '',
    residente: '',
    tipificacion: 'Desconocida',

}

export const generalInfoSchema = schema<GeneralInfo>((rootPath) => {
    required(rootPath.paciente, { message: "Nombre de la paciente es requerido" });
    required(rootPath.fechaEvaluacion, { message: "Fecha de evaluación es requerida" });
    required(rootPath.expediente, { message: "Expediente es requerido" });
    min(rootPath.edad, 0, { message: "La edad no puede ser menor que 0" });
})