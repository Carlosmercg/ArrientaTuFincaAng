import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './components/home/home.component';
import { PropertyComponent } from "./components/property/property.component";
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [HomeComponent, CommonModule, PropertyComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';
}
