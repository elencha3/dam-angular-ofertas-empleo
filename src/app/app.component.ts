import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portal-ofertas';
  
  public arrayDatosOfertas: Array<any>;

  constructor(
    private homeService: HomeService,
    private router: Router) { }

  ngOnInit(): void {
    this.homeService.getOffersData().subscribe(
      response =>{
        console.log(this.arrayDatosOfertas = response); 
      },
      error => {
        console.log('Error ' + JSON.stringify(error));
      }
  )
  }

}
