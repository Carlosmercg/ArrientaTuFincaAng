import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../interfaces/user'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  // Busca usuario por username
  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/username/${username}`);
  }

    // Crea un nuevo usuario
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/create`, user);
  }
  // Actualiza un usuario existente
updateUser(userId: number, user: User): Observable<User> {
  return this.http.put<User>(`${this.apiUrl}/update/${userId}`, user);
}
  
}
