import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-loginsignin',
  imports: [FormsModule],
  templateUrl: './loginsignin.component.html',
  styleUrl: './loginsignin.component.css'
})
export class LoginsigninComponent {
  isLoginMode = true; // Alternar entre login/signup
  
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  
  onSubmit(form: NgForm) {
    if (this.isLoginMode) {
      // Lógica login
    } else {
      // Lógica registro
    }
  }
}
