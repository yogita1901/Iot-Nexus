import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TankDataService } from '../../service/tank-data.service';
import { io } from 'socket.io-client';

export const socket = io("https://iot-nexus-backend.vercel.app");

@Component({
  selector: 'app-tank-status',
  templateUrl: './tank-status.component.html',
  styleUrls: ['./tank-status.component.css']
})
export class TankStatusComponent implements OnInit {
  tankCount: number = 0;
  tanks= [
    { id: 1, name: 'Home Tank', level:'55' },
    { id: 2, name: 'Shop Tank', level:'80'},
    { id: 3, name: 'Home 2 Tank', level: '25'}
  ];  
  tankState: any;

  constructor(
    private tankDataService: TankDataService,
    private http: HttpClient 
  ) { }

  ngOnInit(): void {
    this.tankCount = this.tankDataService.getTankCount();
    this.fetchTankData();
    socket.on("connect", () => {
      console.log("client is connected to server!");
    });
    console.log('TankStatusComponent initialized');
  }

  fetchTankData() {
    this.http.get<any>('https://iot-nexus-backend.vercel.app/dashboard/tankLevels').subscribe(
      data => {
        console.log(data); // Log the received data for debugging
        this.tankState = data; // Assign the received data to tankState for use in the template
      },
      error => {
        console.error('Error fetching tank data:', error);
      }
    );
  }
  
  
}
