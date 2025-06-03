import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { CreatePropertyComponent } from './components/create-property/create-property.component';
import { RequestsForMyPropertiesComponent } from './components/requests-for-my-properties/requests-for-my-properties.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'propiedad/:id', component: PropertyDetailComponent },
    { path: 'checkout/propiedad/:id', component: CartComponent },
    { path: 'mis-reservas', component: MyBookingsComponent },
    { path: 'mi-perfil', component: MyProfileComponent},
    { path: 'crear-propiedad', component: CreatePropertyComponent },
    { path: 'solicitudes-para-mis-propiedades', component: RequestsForMyPropertiesComponent },
    { path: '**', component: HomeComponent } 
];