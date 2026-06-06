import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaOrdenesCompraPenalidad } from './tabla-ordenes-compra-penalidad';

describe('TablaOrdenesCompraPenalidad', () => {
  let component: TablaOrdenesCompraPenalidad;
  let fixture: ComponentFixture<TablaOrdenesCompraPenalidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaOrdenesCompraPenalidad],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaOrdenesCompraPenalidad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
