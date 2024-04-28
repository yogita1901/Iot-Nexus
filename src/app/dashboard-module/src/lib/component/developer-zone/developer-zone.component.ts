import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-developer-zone',
  templateUrl: './developer-zone.component.html',
  styleUrls: ['./developer-zone.component.css']
})
export class DeveloperZoneComponent implements OnInit {
  isMenuOpen: boolean = true;
  sidebarClass: string = 'sidenav';

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.sidebarClass = this.isMenuOpen ? 'sidenav' : 'sidenav collapsed';
  }
  constructor() { }

  ngOnInit(): void {
  }

}
