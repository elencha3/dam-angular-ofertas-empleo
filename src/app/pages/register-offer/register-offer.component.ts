import { AuthService } from './../../services/auth.services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OfferForm } from 'src/app/models/offer-form.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    // this.authService.userObservable.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.authService.isLogged();
  }

  offerFormRegister = this.formBuilder.group({
    titulo: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
    descripcion: ['', Validators.compose([Validators.required, Validators.maxLength(300)])],
    empresa:  ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    salario: ['', Validators.required],
    ciudad: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    email: ['', Validators.compose([Validators.email, Validators.required, Validators.maxLength(50)])],
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
    this.authService.postOffersData(offer).subscribe(offer => console.log(offer));
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
