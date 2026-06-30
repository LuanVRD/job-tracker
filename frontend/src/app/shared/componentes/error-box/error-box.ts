import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-error-box',
  imports: [],
  templateUrl: './error-box.html',
  styleUrl: './error-box.scss',
})
export class ErrorBoxComponent {
  errorMessage = input.required<string | null>();
} 
