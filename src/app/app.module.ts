import { AuthGuard } from './services/authGuard';
import { AuthService } from './services/auth.services';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,    
  ],
  imports: [
    BrowserModule,  
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule,
  
  ],
  providers: [
    AuthService,
    AuthGuard    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
