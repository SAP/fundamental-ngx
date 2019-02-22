import { Component } from '@angular/core';

@Component({
    selector: 'fd-button-group',
    templateUrl: './button-group.component.html',
    host: {
        'role': 'group',
        'aria-label': 'Group label',
        class: 'fd-button-group'
    }
})
export class ButtonGroupComponent {}
