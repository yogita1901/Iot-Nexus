import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperZoneComponent } from './developer-zone.component';

describe('DeveloperZoneComponent', () => {
  let component: DeveloperZoneComponent;
  let fixture: ComponentFixture<DeveloperZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloperZoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
