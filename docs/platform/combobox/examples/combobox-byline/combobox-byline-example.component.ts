import { Component } from '@angular/core';
import { ComboboxItem } from '@fundamental-ngx/core/combobox';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { ComboboxSelectionChangeEvent } from '@fundamental-ngx/platform/form';

export interface ExampleItem {
    name: string;
    icon: string;
}

@Component({
    selector: 'fdp-combobox-byline-example',
    templateUrl: './combobox-byline-example.component.html'
})
export class ComboboxBylineExampleComponent {
    dataSource: ExampleItem[] = [
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

    selectedItem: ComboboxItem | null = null;

    selectedItem2: ComboboxItem | null = null;

    mobileConfig: MobileModeConfig = {
        title: 'Title',
        approveButtonText: 'Save',
        cancelButtonText: 'Cancel',
        hasCloseButton: true
    };

    onSelect(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem = item.payload;
    }

    onSelect2(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem2 = item.payload;
    }
}
