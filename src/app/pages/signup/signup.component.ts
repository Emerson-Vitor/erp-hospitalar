import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

export interface SignupForm {
  cpf: FormControl,
  nome: FormControl,
  email: FormControl,
  telefone: FormControl,
  password: FormControl,
  passwordConfirm: FormControl,
  logradouro: FormControl,
  numero: FormControl,
  bairro: FormControl,
  cidade: FormControl,
  estado: FormControl
}


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ){
    this.signupForm = new FormGroup({
      cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]),
      nome: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z\s]*$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required, Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]),
      logradouro: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      bairro: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required)
    });
    
    this.signupForm.get('cpf')?.valueChanges.subscribe((cpf: string) => {
      if (cpf) {
        cpf = cpf.replace(/\D/g, '');
        cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
        this.signupForm.get('cpf')?.setValue(cpf, { emitEvent: false }); // emitEvent: false para evitar loop infinito
      }
    });
    this.signupForm.get('telefone')?.valueChanges.subscribe((telefone: string) => {
      if (telefone) {
        telefone = telefone.replace(/\D/g, '');
        telefone = telefone.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2$3-$4');
        this.signupForm.get('telefone')?.setValue(telefone, { emitEvent: false }); // emitEvent: false para evitar loop infinito
      }
    });
  }
 


  submit() {
    this.loginService.signup(
      this.signupForm.value.password,
      this.signupForm.value.telefone,
      this.signupForm.value.nome,
      this.signupForm.value.email,
      this.signupForm.value.cpf,
      {
        logradouro: this.signupForm.value.logradouro,
        numero: this.signupForm.value.numero,
        bairro: this.signupForm.value.bairro,
        cidade: this.signupForm.value.cidade,
        estado: this.signupForm.value.estado
      }
    ).subscribe({
      next: () => { this.toastService.success("Login feito com sucesso!")
        this.router.navigate(["login"])
      },
      error: () => this.toastService.error("Erro inesperado! Tente novamente mais tarde")
    });
  }
  

  navigate(){
    this.router.navigate(["login"])
  }
}