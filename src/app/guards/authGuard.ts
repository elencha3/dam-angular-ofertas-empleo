import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginForm } from "../models/login-form.model";
import { AuthService } from "../services/auth.services";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private authService: AuthService) {
}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

            let loginValue = this.authService.loginValue();
            console.log(loginValue)

        if (loginValue != null) {
            return true;

        } else {
            window.alert("no tienes permiso")
            this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
            return false;
        }

    }

}
