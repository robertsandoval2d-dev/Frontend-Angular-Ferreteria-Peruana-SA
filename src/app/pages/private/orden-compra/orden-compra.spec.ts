import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenCompra } from './orden-compra';

describe('OrdenCompra', () => {
  let component: OrdenCompra;
  let fixture: ComponentFixture<OrdenCompra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenCompra],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdenCompra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
