import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms'; // Removed ReactiveFormsModule from imports
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';

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
    private userService: UserService // Make sure UserService is correctly injected
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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      const userData = this.router.getCurrentNavigation()?.extras.state?.['userData'];

      if (userData) {
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
      } else {
        console.error('Dados do usuário não encontrados.');
      }
    });
  }

  submit(): void {
    console.log(this.signupForm.value);
    // Implement logic to update user using this.userService
    // Example: this.userService.updateUser(userId, this.signupForm.value).subscribe(result => { ... });
  }

  navigate(): void {
    // Implement navigation logic if needed
  }
}
