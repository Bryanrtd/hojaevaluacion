import { min, schema } from "@angular/forms/signals";
import { Antecedentes, antecedentesInitialData } from "./Antecedentes.model";
import { GeneralInfo, generalInfoInitialData } from "./GeneralInfo.model";
import { HistorialClinico, historicalClinicoInitialData } from "./HistorialClinico.model";

export interface PatientInformation {
    generalInfo: GeneralInfo;
    historialClinico: HistorialClinico;
    actecedentes: Antecedentes;
    procedimientos: { fecha: Date; tipoProcedimiento: string; descripcion: string }[];
    estudiosComplementarios: { fecha: Date; tipoEstudio: string; hallazgos: string }[];
    motivoConsulta: string;
    diagnostico: string;
    plan: string;
    G: number;
    P: number;
    A: number;
    C: number;
    E: number;
    M: number;
    ta: number;
    fc: number;
    fr: number;
    examenFisico: {
        cuello: string;
        mamas: string
        abdomen: string;
        genitalesExternos: string;
        regionInguinal: string;
        especuloscopia: string;
        tactoVaginal: string;
        tactoRectal: string;
        miembrosInferiores: string;
    }
}

export const patientInfoInitialData: PatientInformation = {
    generalInfo: generalInfoInitialData,
    historialClinico: historicalClinicoInitialData,
    actecedentes: antecedentesInitialData,
    procedimientos: [
        {
            fecha: new Date(),
            tipoProcedimiento: '',
            descripcion: ''
        }
    ],
    estudiosComplementarios: [
        {
            fecha: new Date(),
            tipoEstudio: '',
            hallazgos: ''
        }
    ],
    motivoConsulta: '',
    diagnostico: '',
    plan: '',
    G: Number.NaN,
    P: Number.NaN,
    A: Number.NaN,
    C: Number.NaN,
    E: Number.NaN,
    M: Number.NaN,
    ta: Number.NaN,
    fc: Number.NaN,
    fr: Number.NaN,
    examenFisico: {
        cuello: '',
        mamas: '',
        abdomen: '',
        genitalesExternos: '',
        regionInguinal: '',
        especuloscopia: '',
        tactoVaginal: '',
        tactoRectal: '',
        miembrosInferiores: '',
    }

}

export const generalInfoSchema = schema<PatientInformation>((rootPath) => {
    min(rootPath.G, 0, { message: "G no puede ser menor que 0" });
    min(rootPath.P, 0, { message: "P no puede ser menor que 0" });
    min(rootPath.A, 0, { message: "A no puede ser menor que 0" });
    min(rootPath.C, 0, { message: "C no puede ser menor que 0" });
    min(rootPath.E, 0, { message: "E no puede ser menor que 0" });
    min(rootPath.M, 0, { message: "M no puede ser menor que 0" });
})