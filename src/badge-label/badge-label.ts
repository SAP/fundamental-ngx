import { Directive, Input, Component } from '@angular/core';

@Component({
  selector: 'fd-badge',
  host: {
    '[class]': '"fd-badge" + (status ? " fd-badge--" + status : "") + (modifier ? " fd-badge--" + modifier : "")'
  },
  template: `
    <span><ng-content></ng-content></span>
  `
})
export class Badge {
  @Input() status;

  @Input() modifier;
}

@Component({
  selector: 'fd-label',
  host: {
    '[class]': '"fd-label" + (status ? " fd-label--" + status : "")'
  },
  template: `
    <span><ng-content></ng-content></span>
  `
})
export class Label {
  @Input() status;
}
