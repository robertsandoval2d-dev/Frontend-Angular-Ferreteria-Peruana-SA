import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMensaje } from './view-mensaje';

describe('ViewMensaje', () => {
  let component: ViewMensaje;
  let fixture: ComponentFixture<ViewMensaje>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMensaje],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMensaje);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
