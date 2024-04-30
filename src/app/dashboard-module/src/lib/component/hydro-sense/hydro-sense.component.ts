import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { io } from 'socket.io-client';
export const socket = io("https://iot-nexus-backend.vercel.app");

@Component({
  selector: 'app-hydro-sense',
  templateUrl: './hydro-sense.component.html',
  styleUrls: ['./hydro-sense.component.css']
})
export class HydroSenseComponent implements OnInit {
  @ViewChild('tankInfo') tankInfoTemplate!: TemplateRef<any>;
  @ViewChild('tankStatus') tankStatusTemplate!: TemplateRef<any>;
  @ViewChild('waterConsumption') waterConsumptionTemplate!: TemplateRef<any>;

  selectedTemplate!: TemplateRef<any>;


  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (this.tankStatusTemplate) {
        this.selectedTemplate = this.tankStatusTemplate; 
      }
    });
  }

  loadTemplate(template: TemplateRef<any>): void {
    this.selectedTemplate = template;
  }


}
