import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPrivate } from './header-private';

describe('HeaderPrivate', () => {
  let component: HeaderPrivate;
  let fixture: ComponentFixture<HeaderPrivate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPrivate],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderPrivate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
