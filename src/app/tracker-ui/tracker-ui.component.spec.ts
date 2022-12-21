import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerUiComponent } from './tracker-ui.component';

describe('TrackerUiComponent', () => {
  let component: TrackerUiComponent;
  let fixture: ComponentFixture<TrackerUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackerUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackerUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
