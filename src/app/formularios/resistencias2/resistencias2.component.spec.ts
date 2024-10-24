import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resistencias2Component } from './resistencias2.component';

describe('Resistencias2Component', () => {
  let component: Resistencias2Component;
  let fixture: ComponentFixture<Resistencias2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resistencias2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Resistencias2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
