import { AuthService } from './../services/auth.services';
import { LoginForm } from 'src/app/models/login-form.model';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  usuario!: any | null;

  constructor(private authService: AuthService) {
      this.authService.user.subscribe(usuario => {
      this.usuario = usuario
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.usuario != undefined) {
      request = request.clone( {
        setHeaders:{
          Authorization: `Bearer ${this.usuario.id_token}` //añado token
        }
      });
    }
    return next.handle(request);
  }
}
