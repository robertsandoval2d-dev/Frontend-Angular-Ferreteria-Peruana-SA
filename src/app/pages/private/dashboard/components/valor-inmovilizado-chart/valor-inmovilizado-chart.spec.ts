import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorInmovilizadoChart } from './valor-inmovilizado-chart';

describe('ValorInmovilizadoChart', () => {
  let component: ValorInmovilizadoChart;
  let fixture: ComponentFixture<ValorInmovilizadoChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorInmovilizadoChart],
    }).compileComponents();

    fixture = TestBed.createComponent(ValorInmovilizadoChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
