import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fd-combobox-input-example',
  templateUrl: './combobox-input-example.component.html'
})
export class ComboboxInputExampleComponent implements OnInit {
  
  comboboxElements: String[] = ['Pear', 'Strawberry', 'Raspberry'];

  constructor() { }

  ngOnInit() {
  }

}
