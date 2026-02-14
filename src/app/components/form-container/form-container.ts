import { Component, computed, effect, inject, signal } from '@angular/core';
import { GeneralInfoComponent } from '../general-info/general-info';
import { HistoricalClinicoComponent } from '../historical-clinico/historical-clinico';
import { AntecedentesComponent } from '../antecedentes/antecedentes';
import { patientInfoInitialData, PatientInformation } from '../../models/PatientInformation.model';
import { form, FormField } from '@angular/forms/signals';
import { DocGenerator } from '../../services/doc-generator';

@Component({
  selector: 'app-form-container',
  imports: [GeneralInfoComponent, HistoricalClinicoComponent, AntecedentesComponent, FormField],
  templateUrl: './form-container.html',
  styleUrl: './form-container.css',
})
export class FormContainer {
  readonly docGeneratorSrv = inject(DocGenerator);

  patienInformationModel = signal<PatientInformation>(patientInfoInitialData);
  patientInformationForm = form(this.patienInformationModel);
  customAnticonception = signal<string>('');
  isFormValid = computed(() => {
    return !(!this.patientInformationForm.generalInfo().value().paciente || !this.patientInformationForm.generalInfo().value().expediente
      || !this.patientInformationForm.generalInfo().value().fechaEvaluacion)
  });

  tipoProcedimientosList = signal(["Biopsia por Tru-Cut", "Colposcopia", "Colposcopia + Biopsia de Cérvix", "Colposcopia + Biopsia de Cérvix + Biopsia de endometrio",
    "Biopsia directa de cérvix", "Biopsia de endometrio", "Aplicación de ATA", "Aplicación de SFU", "Aplicación de imiquimod", "Citología", "Cono-ASA"
  ])

  tipoEstudiosList = signal(["Citología", "Reporte histopatologico", "Mamografia", "Sonografia de mama", "Sonografia de abdomen", "Sonografia de pelvis | transvaginal",
    "TAC Toráx", "TAC abdomen y pelvis", "RM abdomen y pelvis", "PET", "Gammagrafía Oséa", "Laboratorio", "Otro"
  ])



  cleanDocument() {
    this.patientInformationForm().reset();
  }

  generateDocument() {
    console.log(this.patientInformationForm().value())
    this.docGeneratorSrv.generateDocument(this.patientInformationForm().value());
  }

  agregarProcedimiento() {
    this.patienInformationModel.update(patient => ({
      ...patient,
      procedimientos: [...patient.procedimientos, { fecha: new Date(), tipoProcedimiento: '', descripcion: '' }]
    }))
  }

  removerProcedimientos(index: number) {
    this.patienInformationModel.update(patient => ({
      ...patient,
      procedimientos: patient.procedimientos.filter((_, i) => i !== index)
    }))
  }

  agregarEstudios() {
    this.patienInformationModel.update(patient => ({
      ...patient,
      estudiosComplementarios: [...patient.estudiosComplementarios, { fecha: new Date(), tipoEstudio: '', hallazgos: '' }]
    }))
  }

  removerEstudios(index: number) {
    this.patienInformationModel.update(patient => ({
      ...patient,
      estudiosComplementarios: patient.estudiosComplementarios.filter((_, i) => i !== index)
    }))
  }
}
