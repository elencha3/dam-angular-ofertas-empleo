import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {

  public arrayOffersData: Array<any>;

  constructor( 
    private homeService: HomeService,
    private router: Router) { }

  ngOnInit(): void {
    
    this.homeService.getOffersData().subscribe(
      response =>{
        this.arrayOffersData = response; 
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
