import { Component } from '@angular/core';

@Component({
    selector: 'fd-dropdown-default-example',
    templateUrl: './dropdown-default-example.component.html'
})
export class DropdownDefaultExampleComponent {
    menu1 = [
        { text: 'Option 1', url: '#' },
        { text: 'Option 2', url: '#' },
        { text: 'Option 3', url: '#' }
    ];
}
