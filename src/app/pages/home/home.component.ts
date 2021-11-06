import { AuthService } from './../../services/auth.services';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService]
})
export class HomeComponent implements OnInit {

  public arrayOffersData: Array<any>;

  constructor( 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

    this.authService.isLogged();
    
    this.authService.getOffersData().subscribe(
      response =>{
        this.arrayOffersData = response; 
        console.log(this.arrayOffersData.length)
      },
      error => {
        console.log('Error ' + JSON.stringify(error));
      }
  )
  }

  public viewOfferDetail(id): void{
    this.router.navigate(['offerdetail', id]);
  }

}
