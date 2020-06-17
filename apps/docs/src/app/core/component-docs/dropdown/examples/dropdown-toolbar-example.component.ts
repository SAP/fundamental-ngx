import { Component } from '@angular/core';

@Component({
    selector: 'fd-dropdown-toolbar-example',
    templateUrl: './dropdown-toolbar-example.component.html'
})
export class DropdownToolbarExampleComponent {
    menu1 = [
        { text: 'Option 1', url: '#' },
        { text: 'Option 2', url: '#' },
        { text: 'Option 3', url: '#' }
    ];
}
