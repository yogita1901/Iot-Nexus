import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankStatusComponent } from './tank-status.component';

describe('TankStatusComponent', () => {
  let component: TankStatusComponent;
  let fixture: ComponentFixture<TankStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TankStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TankStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
