import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router){}

  

  home(){
    this.router.navigate([""])
  }
  login(){
    this.router.navigate(["login"])
  }
  contato(){
    this.router.navigate([""])
  }

}
