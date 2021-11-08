import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppEndPoints } from '../endpoints.component';

const URL_AUTH = AppEndPoints.ENDPOINTSAUTH;
const URL = AppEndPoints.ENDPOINTOFERTAS;


@Injectable({ providedIn: 'root' })

export class AuthService {

    constructor(
        private http: HttpClient,
        ) {
    }


    /**    PETICIONES AL SERVIDOR      **/

      /**    LOGIN      **/

    //Petición POST pasando los datos introducidos por el usuario
    login(username: string, password: string, rememberMe: boolean): Observable<any> {
        const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer id_token' }
        return this.http.post<any>(URL_AUTH, { username, password, rememberMe }, {headers} )      
    }
    //Añado token al LocalStorage
    setToken(token: string) {
        localStorage.setItem('id_token', token);
    }
    //Recupero token del LocalStorage   
    getToken() {
        return localStorage.getItem('id_token');
        
    }
    //Elimino token del LocalStorage 
    logout() {
        localStorage.removeItem('id_token');
    }
    //Compruebo si hay token almacenado o no
    isLogged(): boolean {
        if (this.getToken() !== null){
            return true;
        } else {
            return false;
        }
    }

    //GET OFERTAS
    getOffersData(): Observable<any>{
        return this.http.get(URL);
    }
    //GET DETALLE DE OFERTA
    getOfferDetail(id: string): Observable<any>{
        let url = `${AppEndPoints.ENDPOINTOFERTAS}/${id}`;
        return this.http.get(url)
    }
    //POST AÑADIR OFERTAS pasando el token al header
    postOffersData(titulo:string, descripcion: string, empresa: string, salario: string, ciudad: string, email: string): Observable<any>{
        const headers = {
            'Authorization': `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json',
        }
        console.log("Añadida");
        return this.http.post(URL, {titulo, descripcion, empresa, salario, ciudad, email}, {headers});
    }
    //DELETE OFERTA pasando la ID y el token al header
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

