import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboboxComponent, ComboboxItem } from '@fundamental-ngx/core/combobox';
import { FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';

export interface ExampleItem {
    name: string;
    icon: string;
}

@Component({
    selector: 'fd-combobox-byline-example',
    templateUrl: './combobox-byline-example.component.html',
    styleUrls: ['combobox-example.component.scss'],
    imports: [
        FormItemComponent,
        FormLabelComponent,
        ComboboxComponent,
        FormsModule,
        ListModule,
        IconComponent,
        JsonPipe
    ]
})
export class ComboboxBylineExampleComponent {
    values: ExampleItem[] = [
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

    mobileConfig: MobileModeConfig = {
        title: 'Title',
        approveButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        hasCloseButton: true,
        dialogConfig: {
            ariaLabel: 'Title'
        }
    };

    selected: ComboboxItem;

    searchTerm: string;

    searchTerm2: string;

    displayFunction(item: { name: string; icon: string }): string {
        if (item) {
            return item.name;
        } else {
            return '';
        }
    }
}
