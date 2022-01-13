import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './components/basket/basket.component';
import { DishDetailsComponent } from './components/dish-details/dish-details.component';
import { DishFormComponent } from './components/dish-form/dish-form.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'menu', component: DishesComponent},
  {path: 'menu/:id', component: DishDetailsComponent},
  {path: 'add-dish', component: DishFormComponent},
  {path: 'basket', component: BasketComponent},
  {path: '', redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
