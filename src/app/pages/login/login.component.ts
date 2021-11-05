import { AuthService } from './../../services/auth.services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/models/login-form.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})


export class LoginComponent implements OnInit {

      constructor(
        private formBuilder: FormBuilder, 
        private router: Router, 
        private authService: AuthService
      ) { }

      ngOnInit(): void {
        this.authService.isLogged();
      }

      formularioLogin = this.formBuilder.group({
        nombre: ['', Validators.required],
        pass: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        check: ['','']
    })

      enviarFormulario(): void {
        console.log("Enviando login");
        //Convertir datos form a objeto
        let userLog: LoginForm = new LoginForm(
            this.formularioLogin.value.nombre,
            this.formularioLogin.value.pass,
            this.formularioLogin.value.check
      ) 

        this.authService.login(userLog.nombre, userLog.pass, userLog.check)
            .subscribe(
                response => {
                  this.authService.setToken(response.id_token)
                  this.router.navigate(['/admin']);
                    
                },
                error => {
                      console.log("error");
                  });
      }

  }
