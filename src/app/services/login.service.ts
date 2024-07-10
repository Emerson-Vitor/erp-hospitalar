import { HttpClient } from '@angular/common/http'; // Corrigido aqui
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/LoginResponse.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {}

  login(name: string, password: string) {
    return this.httpClient.post<LoginResponse>('/login', { name, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
      }
    ))
  }
}
