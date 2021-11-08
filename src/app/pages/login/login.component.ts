import { AuthService } from './../../services/auth.services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/models/login-form.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})

export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;
  enviado: boolean = false;
  errorMsg!: string | null;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    //Establecemos validaciones para los campos. La contraseña de mínimo 4 para asegurar que no de un badrequest
    this.formularioLogin = this.formBuilder.group({
      nombre: ['', Validators.required],
      pass: ['', [Validators.required, Validators.minLength(4)],
      ],
      check: ['', ''],
    });
  }

  ngOnInit(): void {
    this.authService.isLogged();
  }

  
  //Una vez pulsamos botón de login
  enviarFormulario(): void {

    this.enviado = true;
    if(!this.formularioLogin.valid){
      return;
    }
    //Para el spinner del botón
    this.isLoading = true;

    //Convertir datos form a objeto
    let userLog: LoginForm = new LoginForm(
      this.formularioLogin.value.nombre,
      this.formularioLogin.value.pass,
      this.formularioLogin.value.check
    );
    this.authService
      .login(userLog.nombre, userLog.pass, userLog.check)
      .subscribe(
        (response) => {
          console.log(JSON.stringify(response))
          //Guardamos el token llamando a la función del servidor
          this.authService.setToken(response.id_token);
          //Pasamos a false para que pare el spinner
          this.isLoading = false;
          //No existe mensaje de error
          this.errorMsg = null;
          //Navegamos a la pantalla de admin (ya estamos logados así que entra el canactive)
          this.router.navigate(['/admin']);
        },
        (error) => {
          this.errorMsg = '¡No ha sido posible iniciar sesión!' 
          console.log('ERROR: ' + JSON.stringify(error));
          this.isLoading = false;
        }, () =>{
          this.isLoading = false;
        }
      );
  }
}
