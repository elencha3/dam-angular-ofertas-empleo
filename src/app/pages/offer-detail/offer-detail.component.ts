import { AuthService } from './../../services/auth.services';
import { Offer } from 'src/app/models/offer.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {

  public sub: any;
  public offerDetails: Offer = new Offer();
  public logged: boolean;


  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.showOfferDetail();
    this.authService.isLogged();
  }

  showOfferDetail() {
    this.sub = this.route.paramMap.subscribe((params: ParamMap) =>{
      let id = params.get('id');
      this.authService.getOfferDetail(id).subscribe(
        response =>{
          this.offerDetails = response;
        },
        error => {
          console.log('Error ' + JSON.stringify(error));
        }
      )
    });
  }

  goBack(){
    if(this.authService.isLogged()){
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/home']);
    }

  }
}
