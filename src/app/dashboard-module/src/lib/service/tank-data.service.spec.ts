import { TestBed } from '@angular/core/testing';

import { TankDataService } from './tank-data.service';

describe('TankDataService', () => {
  let service: TankDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TankDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
