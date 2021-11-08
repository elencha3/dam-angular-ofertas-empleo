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
    this.formularioLogin = this.formBuilder.group({
      nombre: ['', Validators.required],
      pass: ['', [Validators.required, Validators.minLength(4)],
      ],
      check: ['', ''],
    });
  }

  ngOnInit(): void {
    console.log(this.authService.loginValue())
  }

  submitForm() {
    //Pasarlo a true para gestionar is invalid
    this.enviado = true;
    if(!this.formularioLogin.valid){
      return;
    }
    this.isLoading = true;
    let userLog: LoginForm = new LoginForm(
      this.formularioLogin.value.nombre,
      this.formularioLogin.value.pass,
      this.formularioLogin.value.check
    );
    this.authService.performLogin(userLog)
    .subscribe(
      respuesta => {
      console.log(JSON.stringify(respuesta));
      this.isLoading = false;
      this.errorMsg = null;
      this.router.navigate['/admin']
      
    },
      error =>{
      this.errorMsg = `⚠️¡No se ha podido iniciar sesión!' ((${error.error?.error}))`;
      console.log('ERROR: ' + JSON.stringify(error));
      this.isLoading = false;
    }, () =>{
      this.isLoading = false;
      this.router.navigate(['/admin']);
    });


  } 

  // enviarFormulario(): void {

  //   this.enviado = true;
  //   if(!this.formularioLogin.valid){
  //     return;
  //   }
  //   this.isLoading = true;
  //   //Convertir datos form a objeto
  //   let userLog: LoginForm = new LoginForm(
  //     this.formularioLogin.value.nombre,
  //     this.formularioLogin.value.pass,
  //     this.formularioLogin.value.check
  //   );
  //   this.authService
  //     .login(userLog.nombre, userLog.pass, userLog.check)
  //     .subscribe(
  //       (response) => {
  //         console.log(JSON.stringify(response))
  //         this.authService.setToken(response.id_token);
  //         this.isLoading = false;
  //         this.errorMsg = null;
  //         this.router.navigate(['/admin']);
  //       },
  //       (error) => {
  //         this.errorMsg = '¡No ha sido posible iniciar sesión!' 
  //         console.log('ERROR: ' + JSON.stringify(error));
  //         this.isLoading = false;
  //       }, () =>{
  //         this.isLoading = false;
  //       }
  //     );
  // }
}
