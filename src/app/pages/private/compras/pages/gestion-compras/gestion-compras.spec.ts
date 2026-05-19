import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCompras } from './gestion-compras';

describe('GestionCompras', () => {
  let component: GestionCompras;
  let fixture: ComponentFixture<GestionCompras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCompras],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionCompras);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
