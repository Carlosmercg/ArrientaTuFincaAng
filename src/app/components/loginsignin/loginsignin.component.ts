import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-loginsignin',
  imports: [FormsModule, CommonModule],
  templateUrl: './loginsignin.component.html',
  styleUrl: './loginsignin.component.css'
})
export class LoginsigninComponent {
  @Input() isLoginMode: boolean = true; // Alternar entre login/signup
  @Output() closeModal = new EventEmitter<void>();
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  closeLogin() {
    this.closeModal.emit();
  }
  
  onSubmit(form: NgForm) {
    if (this.isLoginMode) {
      // Lógica login
    } else {
      // Lógica registro
    }
  }
}
