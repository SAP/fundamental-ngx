import { Component } from '@angular/core';

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
