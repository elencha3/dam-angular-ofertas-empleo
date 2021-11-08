import { AuthService } from './../../services/auth.services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfferForm } from 'src/app/models/offer-form.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { stringify } from 'querystring';

@Component({
  selector: 'app-register-offer',
  templateUrl: './register-offer.component.html',
  styleUrls: ['./register-offer.component.css'],
  providers: [AuthService]
})
export class RegisterOfferComponent implements OnInit {

  offerFormRegister: FormGroup;
  enviado: boolean = false;
  errorMsg!: string | null;
  isLoading: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    
  ) { 
    this.offerFormRegister = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(300)]],
      empresa:  ['', [Validators.required, Validators.maxLength(50)]],
      salario: ['', Validators.required],
      ciudad: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.email, Validators.required, Validators.maxLength(50)]],
  });
  
  }

  ngOnInit(): void {
    this.authService.isLogged();
  }

  
  addOffer(): void{
    this.enviado = true;
    if(!this.offerFormRegister.valid){
      return;
    }
    this.isLoading = true;
    let offer: OfferForm = new OfferForm(
      this.offerFormRegister.value.titulo,
      this.offerFormRegister.value.descripcion,
      this.offerFormRegister.value.empresa,
      this.offerFormRegister.value.salario,
      this.offerFormRegister.value.ciudad,
      this.offerFormRegister.value.email,
    )
    console.log(offer)
    this.authService
    .postOffersData(offer.titulo, offer.descripcion, offer.empresa, offer.salario, offer.ciudad, offer.email)
    .subscribe(
      (response) => {
        console.log(JSON.stringify(response))
        this.isLoading = false;
        this.errorMsg = null;
        this.router.navigate(['/admin']);
      },
      (error) => {
        this.errorMsg = '¡Rellena todos los campos!' 
        this.isLoading = false;
      }, () =>{
        this.isLoading = false;
      }
    );
    // Swal.fire({
    //   title: 'La nueva oferta ha sido añadida',
    //   showClass: {
    //     popup: 'animate__animated animate__fadeInDown'
    //   },
    //   hideClass: {
    //     popup: 'animate__animated animate__fadeOutUp'
    //   }
      
    // })
    this.router.navigate(['/admin']);
  

  }

}
