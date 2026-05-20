import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaOrdenesCompra } from './tabla-ordenes-compra';

describe('TablaOrdenesCompra', () => {
  let component: TablaOrdenesCompra;
  let fixture: ComponentFixture<TablaOrdenesCompra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaOrdenesCompra],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaOrdenesCompra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
