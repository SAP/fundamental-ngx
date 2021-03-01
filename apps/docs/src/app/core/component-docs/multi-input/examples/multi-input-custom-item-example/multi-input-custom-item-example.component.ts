import { Component } from '@angular/core';

@Component({
    selector: 'fd-multi-input-custom-item-example',
    templateUrl: './multi-input-custom-item-example.component.html'
})
export class MultiInputCustomItemExampleComponent {
    values = [
        { name: 'Photo Voltaic', icon: 'photo-voltaic' },
        { name: 'Settings', icon: 'settings' },
        { name: 'Heating Cooling', icon: 'heating-cooling' },
        { name: 'Competitor', icon: 'competitor' },
        { name: 'Chalkboard', icon: 'chalkboard' },
        { name: 'Database', icon: 'database' },
        { name: 'Passenger Train', icon: 'passenger-train' },
        { name: 'World', icon: 'world' },
        { name: 'Shield', icon: 'shield' },
        { name: 'Journey Change', icon: 'journey-change' }
    ];

    selected = [
        this.values[0], this.values[3], this.values[4]
    ];

    displayFunction(item: { name: string; icon: string }): string {
        if (item) {
            return item.name;
        } else {
            return '';
        }
    }
}
