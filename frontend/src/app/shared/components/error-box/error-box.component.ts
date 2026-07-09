import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-error-box',
  imports: [],
  templateUrl: './error-box.component.html',
  styleUrl: './error-box.component.scss',
})
export class ErrorBoxComponent {
  errorMessage = input.required<string | null>();
} 
