import { Offer } from 'src/app/models/offer.model';
import { HomeService } from 'src/app/services/home.service';
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


  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.showOfferDetail();
  }

  showOfferDetail() {
    this.sub = this.route.paramMap.subscribe((params: ParamMap) =>{
      let id = params.get('id');
      this.homeService.getOfferDetail(id).subscribe(
        response =>{
          this.offerDetails = response;
        },
        error => {
          console.log('Error ' + JSON.stringify(error));
        }
      )
    });
    
  }

}
