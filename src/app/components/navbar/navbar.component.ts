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
    console.log(this.authService.isLogged());
  }

  logout() {
    this.authService.logout();
    console.log(this.authService.getToken());
    this.router.navigate(['/login']);
  }

  isLogged(): boolean {
    return this.authService.isLogged();
  }
}
