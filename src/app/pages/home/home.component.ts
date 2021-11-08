import { AuthService } from './../../services/auth.services';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FilterPipe } from 'src/app/pipes/filter.pipe';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService,FilterPipe]
})
export class HomeComponent implements OnInit {

  //Variable para usar pipe de filtrado.
  searchText ="";
  public arrayOffersData: Array<any>;

  constructor( 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

    this.authService.isLogged();
    //Llamo al servicio a la función GET para recoger las ofertas y mostrarlas en pantalla

    this.authService.getOffersData().subscribe(
      response =>{
        this.arrayOffersData = response; 
      },
      error => {
        console.log('Error ' + JSON.stringify(error));
      }
  )
  }
  //entrar en el detalle de cada oferta
  public viewOfferDetail(id): void{
    this.router.navigate(['offerdetail', id]);
  }

}
