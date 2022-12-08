import { Component } from '@angular/core';

@Component({
    selector: 'fd-combobox-template-example',
    templateUrl: './combobox-template-example.component.html'
})
export class ComboboxTemplateExampleComponent {
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

    selected: any;

    searchTerm: string;

    displayFunction(item: { name: string; icon: string }): string {
        if (item) {
            return item.name;
        } else {
            return '';
        }
    }
}
