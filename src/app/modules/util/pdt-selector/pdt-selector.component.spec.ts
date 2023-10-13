import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdtSelectorComponent } from './pdt-selector.component';

describe('PdtSelectorComponent', () => {
  let component: PdtSelectorComponent;
  let fixture: ComponentFixture<PdtSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdtSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdtSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
