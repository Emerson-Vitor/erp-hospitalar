import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {

  users: any[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.error(error)
    );
  }

  editUser(user: any): void {
    // Armazene os dados do usuário no sessionStorage
    console.log(user);
    sessionStorage.setItem('userData', JSON.stringify(user));
    
    // Navegue para o componente de edição
    this.router.navigate(['edit-user', user.id]);
  }
}
