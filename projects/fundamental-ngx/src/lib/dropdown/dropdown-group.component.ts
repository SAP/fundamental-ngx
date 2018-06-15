import { Component } from '@angular/core';

@Component({
    selector: 'fd-dropdown-group',
    host: {
        class: 'fd-dropdown__group'
    },
    template: `
    <ng-content></ng-content>
  `
})
export class DropdownGroupComponent {}
