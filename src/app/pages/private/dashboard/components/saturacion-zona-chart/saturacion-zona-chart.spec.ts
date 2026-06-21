import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaturacionZonaChart } from './saturacion-zona-chart';

describe('SaturacionZonaChart', () => {
  let component: SaturacionZonaChart;
  let fixture: ComponentFixture<SaturacionZonaChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaturacionZonaChart],
    }).compileComponents();

    fixture = TestBed.createComponent(SaturacionZonaChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
