import { Component, effect, input, output, signal } from '@angular/core';
import { GeneralInfo, generalInfoSchema, generalInfoInitialData } from '../../models/GeneralInfo.model';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-general-info',
  imports: [FormField],
  templateUrl: './general-info.html',
  styleUrl: './general-info.css',
})
export class GeneralInfoComponent {

  private readonly generalInfoModel = signal<GeneralInfo>(generalInfoInitialData);
  generalInfoForm = form(this.generalInfoModel, generalInfoSchema);
  generalInfo = output<GeneralInfo>();
  cleanForm = input<boolean>(false);


  tipicationList = signal(['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'Desconocida'])


  eff = effect(() => {
    if (this.cleanForm()) {
      this.generalInfoForm().value.set(generalInfoInitialData);
    }
    
    this.generalInfo.emit(this.generalInfoForm().value())
  })
}
