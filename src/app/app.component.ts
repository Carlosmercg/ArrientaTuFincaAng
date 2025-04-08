import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './components/home/home.component';
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [HomeComponent, CommonModule],
  template: `
    <main>
      <header class="brand-name">
        <img class="brand-logo" src="assets/images/logo.png" alt="logo" aria-hidden="true" />
      </header>
      <section class="content">
        <app-home></app-home>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';
}
