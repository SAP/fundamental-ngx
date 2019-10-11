import { Component } from '@angular/core';

@Component({
    selector: 'fd-popover-placement-example',
    templateUrl: './popover-placement-example.component.html',
    styles: ['./@import "../../../../../../../../../node_modules/fundamental-styles/dist/layout.css";'],
})
export class PopoverPlacementExampleComponent {

    menu1 = [
        { text: 'Option 1', url: '#' },
        { text: 'Option 2', url: '#' },
        { text: 'Option 3', url: '#' }
    ];

}
