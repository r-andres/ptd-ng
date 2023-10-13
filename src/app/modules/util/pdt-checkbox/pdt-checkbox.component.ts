import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pdt-checkbox',
  templateUrl: './pdt-checkbox.component.html',
  styleUrls: ['./pdt-checkbox.component.scss']
})
export class PdtCheckboxComponent {
  @Input()
  label: string;
}
