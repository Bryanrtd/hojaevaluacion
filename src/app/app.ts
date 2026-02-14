import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormContainer } from './components/form-container/form-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormContainer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('HojaEvaluacion');
}
