import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DishFormComponent } from './components/dish-form/dish-form.component';
import { RateComponent } from './components/rate/rate.component';
import { BasketComponent } from './components/basket/basket.component';
import { BasketService } from './services/basket.service';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MenuService } from './services/menu.service';
import { CurrencyComponent } from './components/currency/currency.component';
import { CurrencyService } from './services/currency.service';
import { DishDetailsComponent } from './components/dish-details/dish-details.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { RateFormComponent } from './components/rate-form/rate-form.component';
import { FormsModule } from '@angular/forms'; 

// FIRESTORE
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule} from '@angular/fire/compat/firestore'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


import { environment } from '../environments/environment';
import { RatesListComponent } from './components/rates-list/rates-list.component';
import { MapComponent } from './components/map/map.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';




@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    DishFormComponent,
    RateComponent,
    BasketComponent,
    HomeComponent,
    NavigationComponent,
    CurrencyComponent,
    DishDetailsComponent,
    CarouselComponent,
    RateFormComponent,
    RatesListComponent,
    MapComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [BasketService, MenuService, CurrencyService],
  bootstrap: [AppComponent],
})
export class AppModule { }
