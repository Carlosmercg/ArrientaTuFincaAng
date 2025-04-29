import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'propiedad/:id', component: PropertyDetailComponent },
    { path: 'checkout/propiedad/:id', component: CartComponent },
    { path: 'mis-reservas', component: MyBookingsComponent },
    { path: '**', component: HomeComponent } // Redirect to home for any unknown routes
];