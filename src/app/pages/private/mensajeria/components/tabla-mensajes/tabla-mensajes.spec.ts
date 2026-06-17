import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMensajes } from './tabla-mensajes';

describe('TablaMensajes', () => {
  let component: TablaMensajes;
  let fixture: ComponentFixture<TablaMensajes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaMensajes],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaMensajes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
