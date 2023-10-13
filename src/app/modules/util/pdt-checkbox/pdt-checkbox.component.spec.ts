import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdtCheckboxComponent } from './pdt-checkbox.component';

describe('PdtCheckboxComponent', () => {
  let component: PdtCheckboxComponent;
  let fixture: ComponentFixture<PdtCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdtCheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdtCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
