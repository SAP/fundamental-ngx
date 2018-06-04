import { Component, Input } from '@angular/core';

@Component({
  selector: 'fd-label',
  host: {
    '[class]': '"fd-label" + (status ? " fd-label--" + status : "")'
  },
  templateUrl: './badge-label.component.html'
})
export class LabelComponent {
  @Input() status;
}
