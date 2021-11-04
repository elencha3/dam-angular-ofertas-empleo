import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppEndPoints } from '../endpoints.component';
import { OfferForm } from '../models/offer-form.model';

let urlAuth = AppEndPoints.ENDPOINTSAUTH;
let url = AppEndPoints.ENDPOINTOFERTAS;


@Injectable({ providedIn: 'root' })

export class AuthService {

    // private user$: BehaviorSubject<any>;
    // public userObservable: Observable<any>;
    // public user;

    constructor(
        private http: HttpClient,
        ) {
    }

    login(username: string, password: string, rememberMe: boolean): Observable<any> {
        const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer id_token' }
        return this.http.post<any>(urlAuth, { username, password, rememberMe }, {headers} )      
    }
    
    setToken(token: string) {
        localStorage.setItem('id_token', token);
    }

    getToken() {
        return localStorage.getItem('id_token');
        
    }

    public postOffersData(offer: OfferForm): Observable<any>{
        const headers = {
            'Authorization': `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json',
        }
        console.log(this.getToken());
        return this.http.post(url, offer, {headers});
    }

    // logout() {
    //     localStorage.removeItem('token');
    //     this.user$.next(null);
    // }

    public getOffersData(): Observable<any>{
        return this.http.get(url);
    }

    public getOfferDetail(id: string): Observable<any>{
        let url = `${AppEndPoints.ENDPOINTOFERTAS}/${id}`;
        return this.http.get(url)
    }
}

