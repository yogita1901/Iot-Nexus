import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TankDataService {
  private tankCount: number = 0;

  constructor() {}

  setTankCount(count: number): void {
    this.tankCount = count;
  }

  getTankCount(): number {
    return this.tankCount;
  }
}

