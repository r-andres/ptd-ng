import { Component } from '@angular/core';

@Component({
  selector: 'app-pdt-dropdown',
  templateUrl: './pdt-dropdown.component.html',
  styleUrls: ['./pdt-dropdown.component.scss']
})
export class PdtDropdownComponent {
  
  expanded = false;

  show() {
    this.expanded = true;
  }

  close() {
    this.expanded = false;
  }

  toggle() {
    this.expanded = !this.expanded;
  }

}
