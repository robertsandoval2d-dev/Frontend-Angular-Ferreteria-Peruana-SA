import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAnalisisVentas } from './tabla-analisis-ventas';

describe('TablaAnalisisVentas', () => {
  let component: TablaAnalisisVentas;
  let fixture: ComponentFixture<TablaAnalisisVentas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaAnalisisVentas],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaAnalisisVentas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
