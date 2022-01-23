import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DishFormComponent } from './components/dish-form/dish-form.component';
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
import { RatingComponent } from './components/rating/rating.component';

// FIRESTORE
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule} from '@angular/fire/compat/firestore'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


import { environment } from '../environments/environment';
import { RatesListComponent } from './components/rates-list/rates-list.component';
import { MapComponent } from './components/map/map.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DishesManagerComponent } from './components/dishes-manager/dishes-manager.component';
import { EditDishComponent } from './components/edit-dish/edit-dish.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { UsersListComponent } from './components/users-list/users-list.component';




@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    DishFormComponent,
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
    RatingComponent,
    DishesManagerComponent,
    EditDishComponent,
    AdminViewComponent,
    UsersListComponent
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
