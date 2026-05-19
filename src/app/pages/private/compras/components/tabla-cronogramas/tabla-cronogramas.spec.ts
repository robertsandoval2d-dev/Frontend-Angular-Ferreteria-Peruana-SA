import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCronogramas } from './tabla-cronogramas';

describe('TablaCronogramas', () => {
  let component: TablaCronogramas;
  let fixture: ComponentFixture<TablaCronogramas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaCronogramas],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaCronogramas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
