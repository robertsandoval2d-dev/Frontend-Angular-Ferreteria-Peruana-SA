import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoOrdenes } from './seguimiento-ordenes';

describe('SeguimientoOrdenes', () => {
  let component: SeguimientoOrdenes;
  let fixture: ComponentFixture<SeguimientoOrdenes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguimientoOrdenes],
    }).compileComponents();

    fixture = TestBed.createComponent(SeguimientoOrdenes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
