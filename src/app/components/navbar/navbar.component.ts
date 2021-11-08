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
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
  }

  //Logout de la aplicación llamando al servicio y quitando el token. Redirige al login.

  logout() {
    this.authService.logout();
    console.log(this.authService.getToken());
    this.router.navigate(['/login']);
  }

  // función para saber si el usuario está logueado. 
  // Llamo a esta función desde el html para mostrar y ocultar el link de admin, registrar oferta y botones de login y logout

  isLogged(): boolean {
    return this.authService.isLogged();
  }
}
