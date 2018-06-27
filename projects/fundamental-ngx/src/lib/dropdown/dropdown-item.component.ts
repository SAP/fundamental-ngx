import { Component } from '@angular/core';

@Component({
    selector: 'fd-dropdown-item',
    template: `
      <a class="fd-dropdown__item" style="cursor: pointer;"><ng-content></ng-content></a>
  `
})
export class DropdownItemComponent {}
