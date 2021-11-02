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
    
}