import { Component, effect, output, signal } from '@angular/core';
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

  antecedentes = output<Antecedentes>();

  eff = effect(() => {
    this.antecedentes.emit(this.antecedentesForm().value())
  })

}
