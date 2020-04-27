import { Component } from '@angular/core';

@Component({
    selector: 'fd-combobox-template-example',
    templateUrl: './combobox-template-example.component.html',
    styles: [
        '.fd-template-container-div { display: flex; align-items: center; cursor: pointer;}',
        '.fd-template-container-div:hover { background-color: var(--fd-color-background-hover); }',
        '.fd-template-icon { margin-right: 12px; }'
    ]
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

    displayFunction(item: { name: string; icon: string }): string {
        return item.name;
    }
}
