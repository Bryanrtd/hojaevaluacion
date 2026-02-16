import { Component, effect, input, output, signal } from '@angular/core';
import { HistorialClinico, historicalClinicoSchema, historicalClinicoInitialData } from '../../models/HistorialClinico.model';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-historical-clinico',
  imports: [FormField],
  templateUrl: './historical-clinico.html',
  styleUrl: './historical-clinico.css',
})
export class HistoricalClinicoComponent {

  private readonly historialClinicoModel = signal<HistorialClinico>(historicalClinicoInitialData);
  historicalClinicoForm = form(this.historialClinicoModel, historicalClinicoSchema)
  historialClinico = output<HistorialClinico>();
  resetForm = input(false);

  eff = effect(() => {
    if (this.resetForm()) {
      this.historicalClinicoForm().value.set(historicalClinicoInitialData);
    }
    
    this.historialClinico.emit(this.historicalClinicoForm().value())
  })

  anticonceptionList = signal<{ value: string, text: string }[]>([
    { value: 'DIU', text: 'DIU' },
    { value: 'ACO', text: 'ACO' },
    { value: 'ESPUMA', text: 'Espuma' },
    { value: 'CONDON', text: 'Condón' },
    { value: 'DIAFRAGMA', text: 'Diafragma' },
    { value: 'RITMO', text: 'Ritmo' },
    { value: 'COITO INTERRUPTUS', text: 'Coito Interruptus' },
    { value: 'ESTERILIZACION', text: 'Esterilización' },
    { value: 'NINGUNA', text: 'Ninguna' },
  ])


}
