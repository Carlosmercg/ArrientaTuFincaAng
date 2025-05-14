import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginsigninComponent} from './components/loginsignin/loginsignin.component';
import { RouterModule , Router} from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [FormsModule, 
    CommonModule, 
    LoginsigninComponent, 
    RouterModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatInputModule, 
    MatFormFieldModule, 
    BrowserAnimationsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';
  showUserMenu = false;
  isLoggedIn = true; // Cambiar esto según el estado real de autenticación
  showLoginModal: boolean = false;
  isLoginMode = true; // true para login, false para registro
  
  // Datos del usuario (simulados)
  userName = 'Nombre Usuario';
  userEmail = 'usuario@example.com';
  constructor(private router: Router) {}
  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }
  openLogin() {
    this.isLoginMode = true;
    this.showLoginModal = true;
    this.showUserMenu = false;
  }

  closeLoginModal() {
    this.showLoginModal = false;
  }
  handleCloseModal() {
    this.showLoginModal = false;
  }
  handleLoginSuccess(userData: any) {
    this.isLoggedIn = true;
    this.userName = userData.name;
    this.userEmail = userData.email;
    this.closeLoginModal();
  }

  logout() {
    this.isLoggedIn = false;
    this.showUserMenu = false;
    // Aquí también deberías limpiar cualquier dato de sesión
  }
  goToHome() {
    this.router.navigate(['/']);
  }
  goToMyBookings() {
    this.router.navigate(['/mis-reservas']);
  }

}
