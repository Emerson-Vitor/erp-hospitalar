import { CommonModule } from '@angular/common';
import { Component, Output, type OnInit } from '@angular/core';
import { RouterModule,  Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit {
  constructor(private router: Router){

  }
  firstName: string = '';
  lastName: string = '';

  ngOnInit() {
    const fullName = sessionStorage.getItem('username') || '';
    [this.firstName, this.lastName] = fullName.split(' ');
  }

  home(){
    this.router.navigate([""])
  }
  contato(){
    this.router.navigate(["login"])
  }
  update(){
    this.router.navigate(["edit-profile"])
  }

}
