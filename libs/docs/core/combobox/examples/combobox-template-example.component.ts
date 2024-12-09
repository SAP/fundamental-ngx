import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchHighlightPipe } from '@fundamental-ngx/cdk/utils';
import { ComboboxComponent, ComboboxItemDirective } from '@fundamental-ngx/core/combobox';
import { ListModule } from '@fundamental-ngx/core/list';

interface ComboboxItem {
    name: string;
    icon: string;
}

@Component({
    selector: 'fd-combobox-template-example',
    templateUrl: './combobox-template-example.component.html',
    imports: [ComboboxComponent, ComboboxItemDirective, FormsModule, ListModule, JsonPipe, SearchHighlightPipe]
})
export class ComboboxTemplateExampleComponent {
    values: ComboboxItem[] = [
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

    model: ComboboxItem;

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
