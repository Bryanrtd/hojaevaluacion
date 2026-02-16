import { Component, effect, input, output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Antecedentes, antecedentesInitialData } from '../../models/Antecedentes.model';

@Component({
  selector: 'app-antecedentes',
  imports: [FormField],
  templateUrl: './antecedentes.html',
  styleUrl: './antecedentes.css',
})
export class AntecedentesComponent {

  private readonly antecedentesModel = signal<Antecedentes>(antecedentesInitialData);
  antecedentesForm = form(this.antecedentesModel);
  resetForm = input(false);
  antecedentes = output<Antecedentes>();

  eff = effect(() => {
    if (this.resetForm()) {
      this.antecedentesForm().value.set(antecedentesInitialData);
    }
    this.antecedentes.emit(this.antecedentesForm().value())
  })

}
