import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCompensaciones } from './tabla-compensaciones';

describe('TablaCompensaciones', () => {
  let component: TablaCompensaciones;
  let fixture: ComponentFixture<TablaCompensaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaCompensaciones],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaCompensaciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
