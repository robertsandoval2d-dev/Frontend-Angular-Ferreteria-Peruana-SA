import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaOrdenes } from './tabla-ordenes';

describe('TablaOrdenes', () => {
  let component: TablaOrdenes;
  let fixture: ComponentFixture<TablaOrdenes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaOrdenes],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaOrdenes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
