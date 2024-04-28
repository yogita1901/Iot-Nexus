import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HydroSenseComponent } from './hydro-sense.component';

describe('HydroSenseComponent', () => {
  let component: HydroSenseComponent;
  let fixture: ComponentFixture<HydroSenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HydroSenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HydroSenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
