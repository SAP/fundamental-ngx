import { Component } from '@angular/core';

@Component({
    selector: 'fd-dropdown-contextual-menu-example',
    templateUrl: './dropdown-contextual-menu-example.component.html'
})
export class DropdownContextualMenuExampleComponent {
    menu1 = [
        { text: 'Option 1', url: '#' },
        { text: 'Option 2', url: '#' },
        { text: 'Option 3', url: '#' }
    ];
}
