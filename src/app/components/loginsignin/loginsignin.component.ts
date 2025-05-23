import { Component, Input, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-loginsignin',
  templateUrl: './loginsignin.component.html',
  styleUrls: ['./loginsignin.component.css'],
  imports: [FormsModule, CommonModule]
})
export class LoginsigninComponent {
  @Input() isLoginMode: boolean = true; // Alternar entre login/signup
  @Output() closeModal = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<User>();

  errorMessage: string | null = null;

  constructor(private userService: UserService) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = null;
  }

  closeLogin() {
    this.closeModal.emit();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
      return;
    }

    const formData = form.value;

    if (this.isLoginMode) {
      // Login: Buscar usuario por username y validar password
      this.userService.getUserByUsername(formData.username).subscribe({
        next: (user) => {
          if (user.password === formData.password) {
            this.errorMessage = null;
            this.loginSuccess.emit(user);
            this.closeLogin();
          } else {
            this.errorMessage = 'Contraseña incorrecta.';
          }
        },
        error: () => {
          this.errorMessage = 'Usuario no encontrado.';
        }
      });
    } else {
        const newUser: User = {
      
        username: formData.username,
        name: formData.name,
        lastName: formData.lastname,
        email: formData.email,
        password: formData.password,
       
      };

      this.userService.createUser(newUser).subscribe({
        next: (createdUser) => {
          this.errorMessage = null;
          this.loginSuccess.emit(createdUser);
          this.closeLogin();
        },
        error: (err) => {
          if (err.status === 409) {
            this.errorMessage = 'El nombre de usuario ya está en uso.';
          } else {
            this.errorMessage = 'Error al crear el usuario.';
          }
        }
      });
    }
  }
}
