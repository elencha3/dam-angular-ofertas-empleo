import { AuthService } from './../../services/auth.services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AuthService],
})
export class AdminComponent implements OnInit {
  public arrayOffersData: Array<any>;
  public sub: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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

  public viewOfferDetail(id): void {
    this.router.navigate(['offerdetail', id]);
  }

  public deleteOffer(id) {
    this.authService.deleteOffer(id).subscribe(
      (response) => {
        console.log(response);
        window.location.reload();
      },
      (error) => {
        console.log('Error ' + JSON.stringify(error));
      }
    );
  }
}
