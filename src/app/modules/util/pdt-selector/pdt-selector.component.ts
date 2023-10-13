import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pdt-selector',
  templateUrl: './pdt-selector.component.html',
  styleUrls: ['./pdt-selector.component.scss']
})
export class PdtSelectorComponent {

  @Input()
  options;
  @Input()
  label: string;

}
