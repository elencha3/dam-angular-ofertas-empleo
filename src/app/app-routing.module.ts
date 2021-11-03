import { OfferDetailComponent } from './pages/offer-detail/offer-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterOfferComponent } from './pages/register-offer/register-offer.component';
import { LoginComponent } from './pages/login/login.component';

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
  },
  {
    path:'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
