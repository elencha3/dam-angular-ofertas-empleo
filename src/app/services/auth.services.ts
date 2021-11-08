import { LoginForm } from 'src/app/models/login-form.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppEndPoints } from '../endpoints.component';
import { Router } from '@angular/router';
import {map} from "rxjs/operators";

let urlAuth = AppEndPoints.ENDPOINTSAUTH;
let url = AppEndPoints.ENDPOINTOFERTAS;
const LOGIN_KEY = 'login';


@Injectable({ providedIn: 'root' })

export class AuthService {

    private loginModelBehaviourSubject :BehaviorSubject<LoginForm | null> ;
    public user: Observable<LoginForm | null>;

    constructor(
        private http: HttpClient,
        private route: Router
        ) {
            this.loginModelBehaviourSubject = new BehaviorSubject<LoginForm | null>(JSON.parse(<string>localStorage.getItem('LOGIN_KEY')));
            this.user = this.loginModelBehaviourSubject.asObservable();
    }

    performLogin(entrada: LoginForm): Observable<LoginForm>{
        console.log('performLogin(' + JSON.stringify(entrada) + ')');
        return this
        .http
        .post<LoginForm>(urlAuth, entrada)
        .pipe(map(retornoAPI => {
            console.log('Login OK: ' + JSON.stringify(retornoAPI));
            this.loginModelBehaviourSubject.next(retornoAPI);
            console.log(this.loginModelBehaviourSubject.value);
            localStorage.setItem('LOGIN_KEY', JSON.stringify(retornoAPI));
            return retornoAPI;
        }))
    }

    loginValue(): any  {
        return this.loginModelBehaviourSubject?.value;
    }

    performLogout() {
        localStorage.removeItem('LOGIN_KEY');
        this.loginModelBehaviourSubject.next(null);
        this.route.navigate(['/login']);
    }

    // isLogged(): boolean {
    //     if (!this.user){
    //         console.log("sí hay usuario")
    //         return true;
    //     } else {
    //         console.log("no hay usuario")
    //         return false;
    //     }
    // }

    // login(username: string, password: string, rememberMe: boolean): Observable<any> {
    //     const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer id_token' }
    //     return this.http.post<any>(urlAuth, { username, password, rememberMe }, {headers} )      
    // }
    
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
        return this.http.post(url, {titulo, descripcion, empresa, salario, ciudad, email});
    }

    deleteOffer(id:string): Observable<any>{
        let url = `${AppEndPoints.ENDPOINTOFERTAS}/${id}`;
        return this.http.delete(url); 
    }
}

