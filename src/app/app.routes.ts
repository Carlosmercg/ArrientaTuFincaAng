import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'propiedad/:id', component: PropertyDetailComponent },
    { path: '**', component: HomeComponent } // Redirect to home for any unknown routes
];