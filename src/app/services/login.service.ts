import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';
import { SignupComponent } from '../pages/signup/signup.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = 'http://localhost:5074'

  constructor(private httpClient: HttpClient,) { }

  login(email: string, senha: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl+"/api/Auth/login", { email, senha }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
      })
    )
  }
  signup(
    
    senha: string,
    telefone: string,
    Nome: string,
    email: string,
    Cpf: string,
    endereco: {
      logradouro: string,
      numero: string,
      bairro: string,
      cidade: string,
      estado: string
    }
  ) {
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/api/Auth/register", {
      Cpf,
      Nome,
      email,
      telefone,
      senha,
      endereco
    }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
        sessionStorage.setItem("username", value.name);
      })
    );
  }

  updateRegister(
    id: string,
    telefone: string,
    Nome: string,
    email: string,
    Cpf: string,
    endereco: {
      logradouro: string,
      numero: string,
      bairro: string,
      cidade: string,
      estado: string
    },
    senha = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$",
  ) {
    const token = sessionStorage.getItem('auth-token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.httpClient.put<LoginResponse>(this.apiUrl + "/api/User/register/"+id, {
      Cpf,
      Nome,
      email,
      senha,
      telefone,
      endereco
    },{ headers }).pipe();
  }
  
}