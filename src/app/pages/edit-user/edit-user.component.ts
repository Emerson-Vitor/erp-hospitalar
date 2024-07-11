import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
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
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {
  signupForm: FormGroup;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastService: ToastrService,
    private userService: UserService
  ) {
    this.signupForm = this.fb.group({
      cpf: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordConfirm: new FormControl('', Validators.required),
      logradouro: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      bairro: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required)
    });
  }
  userId: string = ""

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];

      console.log('User ID from params:', this.userId);

      const userDataString = sessionStorage.getItem('userData');
      console.log('User data from sessionStorage:', userDataString);
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        console.log('Parsed user data:', userData);
        if (userData && userData.id == this.userId) {
          this.patchFormData(userData);
        } else {
          console.error('Dados do usuário não encontrados ou ID não corresponde.');
        }
      } else {
        console.error('Dados do usuário não encontrados.');
      }
    });
  }

  private patchFormData(userData: any): void {
    console.log('Patching form data:', userData);
    this.signupForm.patchValue({
      nome: userData.nome,
      email: userData.email,
      cpf: userData.cpf,
      telefone: userData.telefone,
      logradouro: userData.endereco.logradouro,
      numero: userData.endereco.numero,
      bairro: userData.endereco.bairro,
      cidade: userData.endereco.cidade,
      estado: userData.endereco.estado
    });
    console.log('Form after patching:', this.signupForm.value);
  }

  submit() {
    this.loginService.updateRegister(
      this.userId,
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
      next: () => { this.toastService.success("modificação feita com sucesso!")
        this.router.navigate(["edit-profile"])
      },
      error: () => this.toastService.error("Erro inesperado! Tente novamente mais tarde")
    });
  }

  navigate(): void {
    this.router.navigate(["user"])
  }
}
