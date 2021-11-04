import { AuthService } from './../services/auth.services';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterOfferComponent } from './register-offer/register-offer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
    declarations: [
        AdminComponent,
        HomeComponent,
        LoginComponent,
        RegisterOfferComponent,
        OfferDetailComponent,
    ],
    imports: [ 
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        ComponentsModule
    ],
    exports: [],
    providers: [
        AuthService
    ],
})
export class PagesModule {}