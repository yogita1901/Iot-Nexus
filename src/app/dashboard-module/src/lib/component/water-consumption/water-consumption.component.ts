import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
export const socket = io("http://localhost:3000");

@Component({
  selector: 'app-water-consumption',
  templateUrl: './water-consumption.component.html',
  styleUrls: ['./water-consumption.component.css']
})
export class WaterConsumptionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
