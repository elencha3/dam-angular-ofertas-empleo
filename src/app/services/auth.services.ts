import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppEndPoints } from '../endpoints.component';

let urlAuth = AppEndPoints.ENDPOINTSAUTH;
let url = AppEndPoints.ENDPOINTOFERTAS;


@Injectable({ providedIn: 'root' })

export class AuthService {

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

    logout() {
        localStorage.removeItem('id_token');
    }

    isLogged(): boolean {
        if (this.getToken() !== null){
            return true;
        } else {
            return false;
        }
    }

    getOffersData(): Observable<any>{
        return this.http.get(url);
    }

    getOfferDetail(id: string): Observable<any>{
        let url = `${AppEndPoints.ENDPOINTOFERTAS}/${id}`;
        return this.http.get(url)
    }

    postOffersData(titulo:string, descripcion: string, empresa: string, salario: string, ciudad: string, email: string): Observable<any>{
        const headers = {
            'Authorization': `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json',
        }
        console.log("Añadida");
        return this.http.post(url, {titulo, descripcion, empresa, salario, ciudad, email}, {headers});
    }

    deleteOffer(id:string): Observable<any>{
        let url = `${AppEndPoints.ENDPOINTOFERTAS}/${id}`;
        const headers = {
            'Authorization': `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json',
        }
        console.log(this.http.delete(url,  {headers}));
        return this.http.delete(url,  {headers}); 
    }
}

