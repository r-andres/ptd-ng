import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdtDropdownComponent } from './pdt-dropdown.component';

describe('PdtDropdownComponent', () => {
  let component: PdtDropdownComponent;
  let fixture: ComponentFixture<PdtDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdtDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdtDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
