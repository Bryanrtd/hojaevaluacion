import { Component, signal } from '@angular/core';
import { FormContainer } from './components/form-container/form-container';

@Component({
  selector: 'app-root',
  imports: [ FormContainer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('HojaEvaluacion');
}
