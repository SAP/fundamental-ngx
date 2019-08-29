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

    menu2 = [
        { text: 'Option 3', url: '#' },
        { text: 'Option 4', url: '#' },
        { text: 'Option 5', url: '#' }
    ];

}

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

@Component({
    selector: 'fd-dropdown-icons-example',
    templateUrl: './dropdown-icons-example.component.html'
})
export class DropdownIconsExampleComponent {

    values = [
        { name: 'Photo Voltaic', icon: 'photo-voltaic' },
        { name: 'Settings', icon: 'settings' },
        { name: 'Database', icon: 'database' },
        { name: 'Passenger Train', icon: 'passenger-train' },
        { name: 'World', icon: 'world' },
        { name: 'Shield', icon: 'shield' }
    ];

}

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

    menu2 = [
        { text: 'Option 3', url: '#' },
        { text: 'Option 4', url: '#' },
        { text: 'Option 5', url: '#' }
    ];
}
