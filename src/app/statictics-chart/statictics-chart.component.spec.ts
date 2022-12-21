import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticticsChartComponent } from './statictics-chart.component';

describe('StaticticsChartComponent', () => {
  let component: StaticticsChartComponent;
  let fixture: ComponentFixture<StaticticsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticticsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticticsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
