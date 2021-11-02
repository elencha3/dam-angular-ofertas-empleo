import { OfferDetailComponent } from './pages/offer-detail/offer-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterOfferComponent } from './pages/register-offer/register-offer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'registerOffer',
    component: RegisterOfferComponent
  },
  {
    path:'offerdetail/:id',
    component: OfferDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
