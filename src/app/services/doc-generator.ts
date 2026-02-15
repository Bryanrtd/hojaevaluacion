import { Injectable } from '@angular/core';
import { Alignment, AlignmentType, Document, Packer, Paragraph, Tab, TabStopPosition, TabStopType, TextRun } from "docx";
import { saveAs } from 'file-saver';
import { GeneralInfo } from '../models/GeneralInfo.model';
import { PatientInformation } from '../models/PatientInformation.model';

@Injectable({
  providedIn: 'root',
})
export class DocGenerator {


  packDocument(document: Document, title: string) {
    Packer.toBlob(document).then((blob) => {
      saveAs(blob, `${title}.docx`)
    });
  }

  generateDocument(patientInformation: PatientInformation) {
    const title = `${patientInformation.generalInfo.expediente} - ${patientInformation.generalInfo.paciente}`;
    const doc = new Document({
      title: title,
      styles: {
        default: {
          document: {
            run: {
              size: '11pt',
              font: "Arial",
            },
          },
        },
      },
      sections: [{
        children: [
          ...this.agregarEncabezados(),
          ...this.generateGeneralInfoSection(patientInformation.generalInfo),
          new Paragraph({
            children: [new TextRun({ text: "Historica Clinica", allCaps: true, bold: true, break: 1 })]

          }),
          ...this.agregarMotivoConsulta(patientInformation.motivoConsulta),
          new Paragraph({
            children: [new TextRun({ text: "Antecedentes", allCaps: true, bold: true, break: 1 })]
          }),
          new Paragraph({
            children: [new TextRun({ text: "Antecedentes Ginecologicos", allCaps: true, bold: true, break: 1 })]
          }),
          ...this.agregarAntecedentesGinecologicos(patientInformation),
          new Paragraph({
            children: [new TextRun({ text: "Examen Fisico", allCaps: true, bold: true, break: 1 })]
          }),
          ...this.agregarExamenFisico(patientInformation),
          new Paragraph({
            children: [new TextRun({ text: "Procedimientos", allCaps: true, bold: true, break: 1 })]
          }),
          ...this.agregarProcedimientos(patientInformation),
          new Paragraph({
            children: [new TextRun({ text: "Estudios Complementarios", allCaps: true, bold: true, break: 1 })]
          }),
          ...this.agregarEstudiosComplementarios(patientInformation),

          new Paragraph({
            children: [
              new TextRun({ text: "Motivo de consulta e historia de la enfermedad actual: ", bold: true, break: 2 }),
              new TextRun({ text: `${patientInformation.diagnostico}`, break: 1 })
            ]
          }),
          new Paragraph({
            children: [...this.addNewTextRun("Plan", patientInformation.plan, false, 2)]
          })
        ]
      }
      ]
    })
    this.packDocument(doc, title);
  }

  generateGeneralInfoSection(generalInformation: GeneralInfo) {
    return [
      new Paragraph({
        alignment: 'right',
        children: [
          new TextRun({ text: "Fecha de evaluación: ", bold: true, break: 2 }),
          new TextRun({ text: `${this.formatDate(generalInformation.fechaEvaluacion)}` })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [
          ...this.addNewTextRun("  Paciente", generalInformation.paciente, false, 1),
          ...this.addNewTextRun("  Edad", generalInformation.edad),
          ...this.addNewTextRun("  Expediente", generalInformation.expediente),
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [
          ...this.addNewTextRun("  Natural", generalInformation.natural, false),
          ...this.addNewTextRun("  Residente", generalInformation.residente),
          ...this.addNewTextRun("  Tipificación", generalInformation.tipificacion),
        ]
      }),
    ]
  }

  agregarEncabezados() {
    const encabezados = ["MINISTERIO DE SALUD PUBLICA", 'HOSPITAL UNIVERSITARIO NUESTRA SEÑORA DE LA ALTAGRACIA', 'SANTO DOMINGO, D.N.',
      "HOJA DE EVALUACION DEL DEPARTAMENTO DE ONCOLOGIA GINECOLOGICA"
    ]
    return encabezados.map((x, idx) => {
      return new Paragraph({
        alignment: "center",
        children: [
          new TextRun({
            text: x,
            bold: true,
            font: "Calibri",
            size: `${12}pt`,
          })
        ]
      })
    })

  }

  agregarMotivoConsulta(motivoConsulta: string) {
    return motivoConsulta ? [
      new Paragraph({
        children: [
          new TextRun({ text: "Motivo de consulta e historia de la enfermedad actual: ", bold: true, break: 2 }),
          new TextRun({ text: `${motivoConsulta}`, break: 1 })
        ]
      })
    ] : []
  }

  agregarAntecedentesGinecologicos(patientInformation: PatientInformation) {
    return [
      new Paragraph({
        children: [
          ...this.addNewTextRun("G", patientInformation.G, false, 1),
          ...this.addNewTextRun("P", patientInformation.P,),
          ...this.addNewTextRun("A", patientInformation.A),
          ...this.addNewTextRun("C", patientInformation.C),
          ...this.addNewTextRun("E", patientInformation.E),
          ...this.addNewTextRun("M", patientInformation.M),
        ]
      }),
      new Paragraph({
        children: [
          ...this.addNewTextRun("Menarquia", patientInformation.historialClinico.menarquia, false, 1),
          ...this.addNewTextRun("Pubarquia", patientInformation.historialClinico.pubarquia, false, 1),
          ...this.addNewTextRun("Telarquia", patientInformation.historialClinico.telarquia, false, 1),
          ...this.addNewTextRun("1er Coito", patientInformation.historialClinico.primerCoito, false, 1),
          ...this.addNewTextRun("Número de Parejas sexuales", patientInformation.historialClinico.parejasSexuales, false, 1),
          ...this.addNewTextRun("Fecha de Ultima Menstruación", this.formatDate(patientInformation.historialClinico.fum), false, 1),
          ...this.addNewTextRun("Metodo Anticonceptivo", patientInformation.historialClinico.anticoncepcion, false, 1),
        ]
      }),
      new Paragraph({
        children: [
          ...this.addNewTextRun("Antecedentes Personales", patientInformation.actecedentes.personales, false, 1),
        ]
      }),
      new Paragraph({
        children: [
          ...this.addNewTextRun("Antecedentes Familiares", patientInformation.actecedentes.familiares, false, 1),
        ]
      }),
      new Paragraph({
        children: [
          ...this.addNewTextRun("Antecedentes Quirúrgicos", patientInformation.actecedentes.quirurgicos, false, 1),
        ]
      }),
      new Paragraph({
        children: [
          ...this.addNewTextRun("Antecedentes Transfusionales", patientInformation.actecedentes.transfucionales, false, 1),
        ]
      }),
      new Paragraph({
        children: [
          ...this.addNewTextRun("Antecedentes Alérgicos", patientInformation.actecedentes.alergicos, false, 1),
        ]
      }),
      new Paragraph({
        children: [
          ...this.addNewTextRun("Hábitos Tóxicos", patientInformation.actecedentes.habitosToxicos, false, 1),
        ]
      }),
    ]
  }

  agregarExamenFisico(patientInformation: PatientInformation) {
    return [
      new Paragraph({
        children: [
          ...this.addNewTextRun("   TA", patientInformation.ta, false, 2),
          ...this.addNewTextRun("   FC", patientInformation.fc),
          ...this.addNewTextRun("   FR", patientInformation.fr),
        ]
      }),
      new Paragraph({
        children: [
          ...this.addNewTextRun("Cuello", patientInformation.examenFisico.cuello, false, 1)
        ]
      }),
      new Paragraph({
        children: [
          ...this.addNewTextRun("Mamas", patientInformation.examenFisico.mamas, false, 1)
        ]
      }),
      new Paragraph({
        children: [
          ...this.addNewTextRun("Abdomen", patientInformation.examenFisico.abdomen, false, 1)
        ]
      }),
      new Paragraph({
        children: [
          ...this.addNewTextRun("Genitales Externos", patientInformation.examenFisico.genitalesExternos, false, 1)
        ]
      }),
      new Paragraph({
        children: [
          ...this.addNewTextRun("Región Inguinal", patientInformation.examenFisico.regionInguinal, false, 1)
        ]
      }),
      new Paragraph({
        children: [
          ...this.addNewTextRun("Tacto Vaginal", patientInformation.examenFisico.tactoVaginal, false, 1)
        ]
      }),
      new Paragraph({
        children: [
          ...this.addNewTextRun("Tacto Rectal", patientInformation.examenFisico.tactoRectal, false, 1)
        ]
      }),
      new Paragraph({
        children: [
          ...this.addNewTextRun("Miembros Inferiores", patientInformation.examenFisico.miembrosInferiores, false, 1)
        ]
      }),
      // ]
      // })
    ]
  }

  agregarProcedimientos(patientInformation: PatientInformation) {
    return patientInformation.procedimientos.length > 0 ?
      patientInformation.procedimientos.map(proc => {
        return new Paragraph({
          children: [
            ...this.addNewTextRun("Fecha", this.formatDate(proc.fecha), false, 1),
            ...this.addNewTextRun("Tipo de Procedimiento", proc.tipoProcedimiento),
            ...this.addNewTextRun("Descripción", proc.descripcion, false, 1),
          ]
        })

      })
      : []
  }

  agregarEstudiosComplementarios(patientInformation: PatientInformation) {
    return patientInformation.estudiosComplementarios.length > 0 ?
      patientInformation.estudiosComplementarios.map(proc => {
        return new Paragraph({
          children: [
            ...this.addNewTextRun("Fecha", this.formatDate(proc.fecha), false, 1),
            ...this.addNewTextRun("Tipo de Estudio", proc.tipoEstudio),
            ...this.addNewTextRun("Hallazgos", proc.hallazgos, false, 1),
          ]
        })

      })
      : []
  }

  addNewTextRun(label: string, text: string | number, addTab: boolean = true, addBreak: number = 0) {
    return text ? [
      new TextRun({ children: [addTab ? new Tab() : "", `${label}: `], bold: true, break: addBreak }),
      new TextRun({ text: `${text}` }),
    ] : []
  }

  formatDate(fecha: Date, addTime: boolean = true) {
    const day = String(fecha.getDate()).padStart(2, '0');
    const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = fecha.getFullYear();
    const formattedTime = fecha.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return `${day}/${month}/${year} ${addTime ? formattedTime : ''}`;
  }



}
