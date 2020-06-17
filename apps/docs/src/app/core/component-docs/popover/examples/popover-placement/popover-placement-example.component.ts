import { Component } from '@angular/core';

@Component({
    selector: 'fd-popover-placement-example',
    templateUrl: './popover-placement-example.component.html',
    styleUrls: ['popover-placement-example.component.scss']
})
export class PopoverPlacementExampleComponent {
    list = [
        { text: 'Option 1', url: '#' },
        { text: 'Option 2', url: '#' },
        { text: 'Option 3', url: '#' }
    ];
}
