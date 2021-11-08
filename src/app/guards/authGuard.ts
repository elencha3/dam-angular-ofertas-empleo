import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.services";


@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(
        private authService: AuthService,
        private router: Router) { }
    
        canActivate (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean  {
        let isAuthenticated = this.authService.isLogged();
        //si el usuario no está autenticado no permite acceder a la página aún escribiéndolo en la URL y redirige al login
        if (!isAuthenticated) {
            window.alert("No tienes permiso para acceder a esta página"); 
            this.router.navigate(["login"],{ queryParams: { retUrl: route.url} });
        } 
        return isAuthenticated;
    }
}