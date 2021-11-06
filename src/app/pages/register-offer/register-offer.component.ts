import { AuthService } from './../../services/auth.services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    
  ) { 
  }

  ngOnInit(): void {
    this.authService.isLogged();
  }

  offerFormRegister = this.formBuilder.group({
    titulo: ['', [Validators.required, Validators.maxLength(100)]],
    descripcion: ['', [Validators.required, Validators.maxLength(300)]],
    empresa:  ['', [Validators.required, Validators.maxLength(50)]],
    salario: ['', Validators.required],
    ciudad: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.email, Validators.required, Validators.maxLength(50)]],
});

  addOffer(): void{
    let offer: OfferForm = new OfferForm(
      this.offerFormRegister.value.titulo,
      this.offerFormRegister.value.descripcion,
      this.offerFormRegister.value.empresa,
      this.offerFormRegister.value.salario,
      this.offerFormRegister.value.ciudad,
      this.offerFormRegister.value.email,
    )
    console.log(offer)
    this.authService.postOffersData(offer.titulo, offer.descripcion, offer.empresa, offer.salario, offer.ciudad, offer.email).subscribe(offer => console.log(offer));
    Swal.fire({
      title: 'La nueva oferta ha sido añadida',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
      
    })
    this.router.navigate(['/admin']);
  

  }

}
