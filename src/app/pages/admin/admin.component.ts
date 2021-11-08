import { AuthService } from './../../services/auth.services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AuthService,FilterPipe],
})
export class AdminComponent implements OnInit {
  public arrayOffersData: Array<any>;
  public sub: any;
  searchText ="";

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  //Llamo al servicio a la función GET para recoger las ofertas y mostrarlas en pantalla

  ngOnInit(): void {
    this.authService.isLogged();

    this.authService.getOffersData().subscribe(
      (response) => {
        this.arrayOffersData = response;
      },
      (error) => {
        console.log('Error ' + JSON.stringify(error));
      }
    );
  }

  //Entrar en el detalle de cada oferta

  public viewOfferDetail(id): void {
    this.router.navigate(['offerdetail', id]);
  }

 //Llamo al servicio a la función DELETE pasándole el ID de la oferta para eliminarla.
  public deleteOffer(id) {
    this.authService.deleteOffer(id).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log('Error ' + JSON.stringify(error));
      }
    );
  //Mostrar popup de confirmación al eliminar.    
    Swal.fire({
      title: 'Vas a borrar una oferta, ¿estás seguro?',
      text: "No podrás recuperarla",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8a2be2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    })
    
}
  }


