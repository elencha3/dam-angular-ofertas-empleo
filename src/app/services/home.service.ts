import { OfferForm } from 'src/app/models/offer-form.model';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppEndPoints } from "../endpoints.component";
import { HttpClient } from "@angular/common/http";



@Injectable()
export class HomeService {


    constructor(
        private http:HttpClient
    ){}

    
    public getOffersData(): Observable<any>{
        let url = AppEndPoints.ENDPOINTOFERTAS;
        return this.http.get(url);
    }

    public getOfferDetail(id: string): Observable<any>{
        let url = `${AppEndPoints.ENDPOINTOFERTAS}/${id}`;
        return this.http.get(url)
    }

    public postOffersData(offer: OfferForm): Observable<any>{
        let url = AppEndPoints.ENDPOINTOFERTAS;
        return this.http.post(url, offer);
    }
    
}