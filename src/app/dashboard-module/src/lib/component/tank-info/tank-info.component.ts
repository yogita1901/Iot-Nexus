import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TankDataService } from '../../service/tank-data.service';
import axios from 'axios';
import { Router } from '@angular/router';

// Define interfaces for form and tank objects
interface TankForm {
  devicename: string;
  deviceid: number;
  height: number;
  diameter: number;
  volume: number;
}
export interface Tank {
  id: number;
  name: string;
  location: string;
  volume: number;
  deviceStatus: string;
  waterConsumption: number;
}


interface TankEntry extends TankForm {
  // You can add additional properties if needed
  id: number; // Example: unique identifier for each tank
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
    { id: 1, name: 'ghar ki tanki left', location: 'Location 1', volume:20, deviceStatus: 'Active', waterConsumption: 100 },
    { id: 2, name: 'ghar ki tanki right', location: 'Location 2', volume:40, deviceStatus: 'Inactive', waterConsumption: 150 },
    { id: 3, name: 'dukaan ki tanki', location: 'Location 3', volume:50, deviceStatus: 'Active', waterConsumption: 170 },
    { id: 4, name: 'ghar no 2 ki tanki', location: 'Location 4', volume:80, deviceStatus: 'Inactive', waterConsumption: 160 },
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
        });
    } else {
      this.tankAddedMessage = 'Please fill out all required fields';
    }
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


}
