import { RouterModule } from '@angular/router';
import { HomeService } from './../services/home.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterOfferComponent } from './register-offer/register-offer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';

@NgModule({
    declarations: [
        AdminComponent,
        HomeComponent,
        LoginComponent,
        RegisterOfferComponent,
        OfferDetailComponent
    ],
    imports: [ 
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
    ],
    exports: [],
    providers: [
        HomeService
    ],
})
export class PagesModule {}