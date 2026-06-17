import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPedidosCompensacion } from './tabla-pedidos-compensacion';

describe('TablaPedidosCompensacion', () => {
  let component: TablaPedidosCompensacion;
  let fixture: ComponentFixture<TablaPedidosCompensacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaPedidosCompensacion],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaPedidosCompensacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
