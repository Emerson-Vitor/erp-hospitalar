import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from './services/auth-guard.service';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },  
  { path: 'login', component: LoginComponent },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "user",
    component: WelcomeComponent,
    canActivate: [AuthGuard]
  },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
];
