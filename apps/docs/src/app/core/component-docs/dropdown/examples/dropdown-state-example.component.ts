import { Component } from '@angular/core';

@Component({
    selector: 'fd-dropdown-state-example',
    templateUrl: './dropdown-state-example.component.html'
})
export class DropdownStateExampleComponent {
    menu1 = [
        { text: 'Option 1', url: '#' },
        { text: 'Option 2', url: '#' },
        { text: 'Option 3', url: '#' }
    ];
}
