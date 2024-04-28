// 
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TankDataService } from '../../service/tank-data.service';
import { NotificationService } from '../../service/notification.service';
import { io } from 'socket.io-client';
export const socket = io("https://iot-nexus-backend.vercel.app")

@Component({
  selector: 'app-tank-status',
  templateUrl: './tank-status.component.html',
  styleUrls: ['./tank-status.component.css']
})
export class TankStatusComponent implements OnInit {
  tankCount: number=0;
  // tanks: { id: number; value: number }[] = [];
  tanks: { id: number, value: number }[] = [
    { id: 1, value: 90 },
    { id: 2, value: 80},
    { id: 3, value: 70 },
    // { id: 4, value: 60 },
    // { id: 5, value: 50 },
    // { id: 5, value: 40 },
    // { id: 5, value: 30 },
    // { id: 5, value: 20 },
    // { id: 5, value: 10 },
  ];
  tankState: any;

  constructor(
    private http: HttpClient,
    private tankDataService: TankDataService,
  ) { }

  ngOnInit(): void {
    this.tankCount = this.tankDataService.getTankCount();
    this.fetchTankData();
    socket.on("connect",()=>{
      console.log("client is connnected to server!");
    })
  }

  fetchTankData() {
  socket.on("tankDataFromDashboard", (data)=>{
    console.log("tankDataFromDashboard: ", data);
  })
  }



}
