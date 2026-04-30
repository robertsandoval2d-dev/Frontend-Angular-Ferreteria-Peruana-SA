import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMercaderia } from './registro-mercaderia';

describe('RegistroMercaderia', () => {
  let component: RegistroMercaderia;
  let fixture: ComponentFixture<RegistroMercaderia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroMercaderia],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroMercaderia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
