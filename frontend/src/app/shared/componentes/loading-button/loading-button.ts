import { Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-button',
  imports: [MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './loading-button.html',
  styleUrl: './loading-button.scss',
})
export class LoadingButtonComponent {
  loading = input.required<boolean>();
  disabled = input.required<boolean>()
} 
