import { min, schema } from "@angular/forms/signals";


export interface HistorialClinico {
    menarquia: number;
    pubarquia: number;
    telarquia: number;
    primerCoito: number;
    parejasSexuales: number;
    citologiaFecha: Date;
    citologiaText: string;
    fum: Date;
    anticoncepcion: string;

}

export const historicalClinicoInitialData: HistorialClinico = {
    menarquia: Number.NaN,
    pubarquia: Number.NaN,
    telarquia: Number.NaN,
    primerCoito: Number.NaN,
    parejasSexuales: Number.NaN,
    citologiaFecha: new Date(),
    citologiaText: '',
    fum: new Date,
    anticoncepcion: ''
}

export const historicalClinicoSchema = schema<HistorialClinico>((rootPath) => {
    min(rootPath.menarquia, 0, { message: "La menarquia no puede ser menor que 0" });
    min(rootPath.pubarquia, 0, { message: "La pubarquia no puede ser menor que 0" });
    min(rootPath.telarquia, 0, { message: "La telarquia no puede ser menor que 0" });
    min(rootPath.primerCoito, 0, { message: "La 1er Coito no puede ser menor que 0" });
})