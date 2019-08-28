import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayNightComponent } from './day-night.component';

describe('DayNightComponent', () => {
  let component: DayNightComponent;
  let fixture: ComponentFixture<DayNightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayNightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayNightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
