import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { CartComponent } from './components/cart/cart.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'propiedad/:id', component: PropertyDetailComponent },
    { path: 'checkout/propiedad/:id', component: CartComponent },
    { path: '**', component: HomeComponent } // Redirect to home for any unknown routes
];