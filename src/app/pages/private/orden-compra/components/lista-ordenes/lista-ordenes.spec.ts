import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaOrdenes } from './lista-ordenes';

describe('ListaOrdenes', () => {
  let component: ListaOrdenes;
  let fixture: ComponentFixture<ListaOrdenes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaOrdenes],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaOrdenes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
