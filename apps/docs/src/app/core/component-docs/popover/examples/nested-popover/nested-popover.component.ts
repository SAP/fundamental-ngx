import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-nested-popover',
    templateUrl: './nested-popover.component.html',
    styleUrls: ['./nested-popover.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NestedPopoverComponent {

    menu1 = [
        { text: 'Option 1', url: '#' },
        { text: 'Option 2', url: '#' },
        { text: 'Option 3', url: '#' }
    ];

    menu2 = [
        { text: 'Option 3', url: '#' },
        { text: 'Option 4', url: '#' },
        { text: 'Option 5', url: '#' }
    ];
}
