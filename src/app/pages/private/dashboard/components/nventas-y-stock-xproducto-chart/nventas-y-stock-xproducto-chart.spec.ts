import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NventasYStockXproductoChart } from './nventas-y-stock-xproducto-chart';

describe('NventasYStockXproductoChart', () => {
  let component: NventasYStockXproductoChart;
  let fixture: ComponentFixture<NventasYStockXproductoChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NventasYStockXproductoChart],
    }).compileComponents();

    fixture = TestBed.createComponent(NventasYStockXproductoChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
