import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './components/basket/basket.component';
import { DishDetailsComponent } from './components/dish-details/dish-details.component';
import { DishFormComponent } from './components/dish-form/dish-form.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DishesManagerComponent } from './components/dishes-manager/dishes-manager.component';
import { AuthGuard } from './guard/auth.guard';
import { CustomerGuard } from './guard/customer.guard';
import { LoggedAuthGuard } from './guard/logged-auth.guard';
import { EditDishComponent } from './components/edit-dish/edit-dish.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { DishManagerGuard } from './guard/dish-manager.guard';
import { AdminViewGuard } from './guard/admin-view.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'menu', component: DishesComponent},
  {path: 'menu/:id', component: DishDetailsComponent, canActivate: [AuthGuard]},
  {
    path: 'dishes-manager',
    component: DishesManagerComponent,
    canActivate: [DishManagerGuard, AuthGuard ]
  },
  {
    path: 'admin-view',
    component: AdminViewComponent,
    canActivate: [AuthGuard, AdminViewGuard]
  },
  {
    path: 'dishes-manager/:id', component: EditDishComponent, canActivate: [AuthGuard, DishManagerGuard]
  },
  {path: 'basket', component: BasketComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [LoggedAuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [LoggedAuthGuard]},
  {path: '', redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
