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
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

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
  isLoggedIn = false; // Cambiar esto según el estado real de autenticación
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
  userName = '';
  userEmail = '';
  constructor(private router: Router, private propertyService: PropertyService,private UserService: UserService, private authService: AuthService ) {}

  ngOnInit() {
 const user = this.authService.getCurrentUser();
  if (user) {
    this.isLoggedIn = true;
    this.userName = user.name;
    this.userEmail = user.email;
  }
}
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
  this.UserService.getUserByUsername(userData.username).subscribe(fullUser=> {
    this.isLoggedIn = true;
    this.userName = fullUser.name;
    this.userEmail = fullUser.email;
    this.authService.setUser(userData); 
    this.closeLoginModal();
    this.closeLoginModal();
  });
}

logout() {
   this.authService.logout(); 
  this.isLoggedIn = false;
  this.userName = '';
  this.userEmail = '';
  this.showUserMenu = false;
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
