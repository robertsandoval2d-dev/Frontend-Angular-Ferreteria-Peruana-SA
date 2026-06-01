import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaOrdenCompra } from './tarjeta-orden-compra';

describe('TarjetaOrdenCompra', () => {
  let component: TarjetaOrdenCompra;
  let fixture: ComponentFixture<TarjetaOrdenCompra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaOrdenCompra],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaOrdenCompra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
