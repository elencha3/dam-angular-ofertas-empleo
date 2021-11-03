
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppEndPoints } from '../endpoints.component';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
let url = AppEndPoints.ENDPOINTSAUTH;


@Injectable({ providedIn: 'root' })

export class AuthService {

    private currentUserSubject$: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    public id_token;

    constructor(private http: HttpClient) {
        this.id_token = JSON.parse(localStorage.getItem('currentUser'));
        this.currentUserSubject$ = new BehaviorSubject<any>(this.id_token);
        this.currentUser = this.currentUserSubject$.asObservable();
    }

    // public get currentUserValue(): any {
    //     return this.currentUserSubject$.value;
    // }

    login(username: string, password: string, rememberMe: boolean) {
        return this.http.post<any>(url, { username, password, rememberMe }, httpOptions )
            .pipe(map(user => {
                    console.log(this.id_token);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject$.next(user);
                    return user;
            }));
    }

        // getLoggedInUser(auth_token): Observable<any> {
        //     const headers = new Headers({
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${auth_token}`
        //     })
        //     return this.http.post(url, { headers: headers })
        // }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject$.next(null);
    }
}

