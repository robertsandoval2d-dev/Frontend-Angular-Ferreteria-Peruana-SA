import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGenerarOrdenCompra } from './form-generar-orden-compra';

describe('FormGenerarOrdenCompra', () => {
  let component: FormGenerarOrdenCompra;
  let fixture: ComponentFixture<FormGenerarOrdenCompra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGenerarOrdenCompra],
    }).compileComponents();

    fixture = TestBed.createComponent(FormGenerarOrdenCompra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
