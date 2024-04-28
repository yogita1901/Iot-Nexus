import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iot-nexus';
  showNavbar: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !(event.url.includes('/hydro-sense') || event.url.includes('/tank-info'));
      }
    });
  }
  isTankInfoRouteActive(): boolean {
    return this.router.url.includes('/tank-info');
  }
}
