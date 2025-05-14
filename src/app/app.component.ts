import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginsigninComponent} from './components/loginsignin/loginsignin.component';
import { RouterModule , Router} from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { PropertyService } from './services/property.service';
import { Property } from './interfaces/property';

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
    MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';
  showUserMenu = false;
  isLoggedIn = true; // Cambiar esto según el estado real de autenticación
  showLoginModal: boolean = false;
  isLoginMode = true; // true para login, false para registro
  searchQuery: string = '';
  selectedCategory: string = 'title';
  
  categories = [
    { value: 'title', label: 'Por título' },
    { value: 'city', label: 'Por ciudad' },
    { value: 'country', label: 'Por país' },
    { value: 'description', label: 'Por descripción' }
  ];
  // Datos del usuario (simulados)
  userName = 'Nombre Usuario';
  userEmail = 'usuario@example.com';
  constructor(private router: Router, private propertyService: PropertyService) {}
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
  
  searchProperties() {
    if (this.searchQuery.trim() || this.selectedCategory) {
      this.propertyService.updateFilteredProperties(this.selectedCategory, this.searchQuery);
      this.router.navigate(['/']);
    } else {
      this.propertyService.resetFilters();
      this.router.navigate(['/']);
    }
  }
  
}
