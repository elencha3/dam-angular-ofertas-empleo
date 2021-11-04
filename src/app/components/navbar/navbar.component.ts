import { AuthService } from './../../services/auth.services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService]
})
export class NavbarComponent implements OnInit {

  user: any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { 
    // this.authService.userObservable.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    console.log(this.user);
  }

//   logout() {
//     this.authService.logout();
//     console.log(this.user);
//     this.router.navigate(['/login']);
// }

  

}
