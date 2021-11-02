import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OfferForm } from 'src/app/models/offer-form.model';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-register-offer',
  templateUrl: './register-offer.component.html',
  styleUrls: ['./register-offer.component.css']
})
export class RegisterOfferComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService
    
  ) { }

  ngOnInit(): void {
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
    console.log("Formulario enviado");
    let offer: OfferForm = new OfferForm(
      this.offerFormRegister.value.titulo,
      this.offerFormRegister.value.descripcion,
      this.offerFormRegister.value.empresa,
      this.offerFormRegister.value.salario,
      this.offerFormRegister.value.ciudad,
      this.offerFormRegister.value.email,
    )

    this.homeService.postOffersData(offer).subscribe(offer => console.log(offer));

  }

}
