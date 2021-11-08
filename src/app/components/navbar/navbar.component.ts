import { LoginForm } from 'src/app/models/login-form.model';
import { AuthService } from './../../services/auth.services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService],
})

export class NavbarComponent implements OnInit {

  usuario!: LoginForm | null;

  constructor(private router: Router, private authService: AuthService) {
    this.usuario = authService.loginValue();
    authService.user.subscribe( usuario => this.usuario = usuario)
  }

  ngOnInit(): void {
    console.log(this.authService.isLogged());
  }

  // logout() {
  //   this.authService.logout();
  //   console.log(this.authService.getToken());
  //   this.router.navigate(['/login']);
  // }

  hayUsuario(): boolean {
    return this.usuario != null;
  }


  logout() {
    this.authService.performLogout();
    this.usuario = null;
  }
  
}
