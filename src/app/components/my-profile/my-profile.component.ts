import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  // Aquí puedes agregar la lógica necesaria para el componente de perfil de usuario
  userId: number = 0; // ID del usuario, si es necesario
  userName: string = ""; 
  userUsername: string = "";
  userLastName: string = "";
  userEmail: string = "";
  userPassword: string = ""; 
  userNewPassword: string = "";
  userConfirmPassword: string = "";
  constructor(private authService: AuthService,
              private userService: UserService
   ) {}
  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userId = user.id!;
      this.userUsername = user.username; 
      this.userName = user.name;
      this.userLastName = user.lastName;
      this.userEmail = user.email;
      this.userPassword = user.password
    }  
  }
  updateProfile() {
    // aqui va la lógica para actualizar el perfil del usuario
  }
  
}
