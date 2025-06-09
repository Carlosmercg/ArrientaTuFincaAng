import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {

  /*  — propiedades “ligadas” al formulario — */
  userId           = 0;
  userUsername     = '';
  userName         = '';
  userLastName     = '';
  userEmail        = '';

  /* — cambio de contraseña (opcional) — */
  userPassword   = '';
  userNewPassword  = '';
  userConfirmPassword = '';

  constructor(
    private authService: AuthService,
    private userService:  UserService
  ) {}

  /* ───────────────────────────────────────────── */
  ngOnInit(): void {
    const u = this.authService.getCurrentUser();
    if (!u) { return; }

    this.userId       = u.id!;
    this.userUsername = u.username;
    this.userName     = u.name;
    this.userLastName = u.lastName;
    this.userEmail    = u.email;
  }

  /* ─────────── guardar cambios ─────────── */
  updateProfile(): void {
  const currentUser = this.authService.getCurrentUser();
  if (!currentUser) { return; }

  const hasBasicChange =
    this.userName     !== currentUser.name     ||
    this.userLastName !== currentUser.lastName ||
    this.userEmail    !== currentUser.email;

  let newPassword: string | null = null;

  /* 1. Validación: si hay contraseña nueva pero no coinciden */
  if (this.userNewPassword || this.userConfirmPassword) {
    if (this.userNewPassword !== this.userConfirmPassword) {
      alert('Las nuevas contraseñas no coinciden.');
      return;
    }
  }

  /* 2. ¿quiere cambiar la contraseña? */
  const quiereCambiarPass =
    this.userNewPassword &&
    this.userConfirmPassword &&
    this.userNewPassword === this.userConfirmPassword;

  if (quiereCambiarPass) {
    if (this.userPassword !== currentUser.password) {
      alert('La contraseña actual es incorrecta.');
      return;
    }
    newPassword = this.userNewPassword;
  }

  if (!hasBasicChange && !newPassword) {
    alert('No hiciste ningún cambio.');
    return;
  }

  const userToSend: User = {
    ...currentUser,
    name:     this.userName,
    lastName: this.userLastName,
    email:    this.userEmail,
    password: quiereCambiarPass ? this.userNewPassword : currentUser.password
  };

  this.userService.updateUser(this.userId, userToSend)
    .subscribe({
      next: (updated) => {
        alert('Perfil actualizado con éxito.');
        this.authService.setCurrentUser(updated);

        this.userPassword =
        this.userNewPassword =
        this.userConfirmPassword = '';
      },
      error: (err) => {
        console.error('Error al actualizar perfil:', err);
        alert('Error al actualizar el perfil.');
      }
    });
}

}
