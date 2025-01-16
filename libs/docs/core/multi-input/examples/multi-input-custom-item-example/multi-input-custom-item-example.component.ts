import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListModule } from '@fundamental-ngx/core/list';
import { MultiInputComponent } from '@fundamental-ngx/core/multi-input';

@Component({
    selector: 'fd-multi-input-custom-item-example',
    templateUrl: './multi-input-custom-item-example.component.html',
    imports: [MultiInputComponent, FormsModule, ListModule, JsonPipe]
})
export class MultiInputCustomItemExampleComponent {
    values: Item[] = [
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

    selected = [this.values[0], this.values[3], this.values[4]].map((el) => el.name);

    valueFn = (item: Item): string => item.name;

    displayFunction(item: Item): string {
        if (item) {
            return item.name;
        } else {
            return '';
        }
    }
}

interface Item {
    name: string;
    icon: string;
}
