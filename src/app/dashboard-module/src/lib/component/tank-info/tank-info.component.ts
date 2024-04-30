import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TankDataService } from '../../service/tank-data.service';
import axios from 'axios';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
export const socket = io("https://iot-nexus-backend.vercel.app")

// Define interfaces for form and tank objects
interface TankForm {
  deviceId: number;
  location: string;
  height: number;
  diameter: number;
  volume: number;
  tankName: string;
}
export interface Tank {
  id: number;
  name: string;
  location: string;
  volume: number;
  deviceStatus: string;
  waterConsumption: number;
}

@Component({
  selector: 'app-tank-info',
  templateUrl: './tank-info.component.html',
  styleUrls: ['./tank-info.component.css']
})
export class TankInfoComponent implements OnInit {
  tankForm: FormGroup;
  showTable: boolean = false;
  tanks: Tank[] = [
    { id: 1, name: 'Home Tank', location: 'Limbodi,Indore', volume:1000, deviceStatus: 'Active', waterConsumption: 100 },
    { id: 2, name: 'Shop Tank', location: 'Delhi', volume:1000, deviceStatus: 'Inactive', waterConsumption: 150 },
    { id: 3, name: 'Home 2 Tank', location: 'Musakhedi,Indore', volume:5000, deviceStatus: 'Active', waterConsumption: 170 },
  ];
  tankParameters = { height: 100, diameter: 50, width: 80 }; 
  waterLevel = 70; 
  tankAddedMessage: string = '';
  showAddTankTemplate: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private tankDataService: TankDataService,
    private router: Router,
  ) {
    this.tankForm = this.formBuilder.group({
      tankName: ['', Validators.required],
      location: ['', Validators.required],
      deviceId: ['', Validators.required],
      height: ['', Validators.required],
      diameter: ['', Validators.required],
      volume: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    if(this.tanks.length > 1){
      this.showTable = true;
    }
    this.fetchTankData();
    socket.on("connect",()=>{
      console.log("client is connnected to server!");
    })
  }

  onSubmit(): void {
    if (this.tankForm.valid) {
      const formData: TankForm = { ...this.tankForm.value };
      console.log(formData);
      axios.post('https://iot-nexus-backend.vercel.app/dashboard/tankSpecification', formData)
        .then(response => {
          console.log('Tank data posted successfully:', response.data);
          this.tankForm.reset();
          this.router.navigate(['/dashboard']);
        })
        .catch(error => {
          console.error('Error posting tank data:', error);
          this.tankAddedMessage = 'Error uploading tank data. Please try again.';
        });
    } else {
      this.tankAddedMessage = 'Please fill out all required fields';
    }
  }
  
  fetchTankData() {
    socket.on("tankDataFromDashboard", (data)=>{
      console.log("tankDataFromDashboard: ", data);
    })
    }

  confirmDelete(index: number): void {
    if (confirm('Are you sure you want to delete this tank entry?')) {
      this.removeTank(index);
  }
  }
  
  removeTank(index: number): void {
    if (this.tanks.length > 1) {
      this.tanks.splice(index, 1);
    }
    this.tankDataService.setTankCount(this.tanks.length);
  }

  private resetForm(): void {
    this.tankForm.reset();
  }

  toggleAddTankTemplate(): void {
    this.showTable = false;
    this.showAddTankTemplate = true;
  }

  editTank(index: number): void {
    // Implement your edit logic here, for example, you can navigate to an edit page
    // or open a modal/dialog to edit the tank details
    console.log('Editing tank:', this.tanks[index]);
    // Example: Navigate to edit page with tank id
    // this.router.navigate(['/edit-tank', this.tanks[index].id]);
  }


}
