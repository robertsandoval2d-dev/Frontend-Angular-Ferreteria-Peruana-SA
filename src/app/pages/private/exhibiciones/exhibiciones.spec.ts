import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exhibiciones } from './exhibiciones';

describe('Exhibiciones', () => {
  let component: Exhibiciones;
  let fixture: ComponentFixture<Exhibiciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exhibiciones],
    }).compileComponents();

    fixture = TestBed.createComponent(Exhibiciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
