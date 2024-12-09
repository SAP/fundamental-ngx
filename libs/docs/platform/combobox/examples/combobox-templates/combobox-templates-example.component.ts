import { ChangeDetectionStrategy, Component } from '@angular/core';

import { JsonPipe } from '@angular/common';
import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import {
    ComboboxSelectionChangeEvent,
    FdpFormGroupModule,
    PlatformComboboxModule
} from '@fundamental-ngx/platform/form';
import { DATA_PROVIDERS } from '@fundamental-ngx/platform/shared';

interface ComboboxTemplateItem {
    name: string;
    type: string;
}

@Component({
    selector: 'fdp-combobox-templates-example',
    templateUrl: './combobox-templates-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        '.fd-template-container-div { display: flex; align-items: center; cursor: pointer;}',
        '.fd-template-text { margin-right: 12px; margin-left: 12px; }'
    ],
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }],
    imports: [FdpFormGroupModule, PlatformComboboxModule, TemplateDirective, IconComponent, JsonPipe]
})
export class ComboboxTemplatesExampleComponent {
    dataSource: ComboboxTemplateItem[] = [
        { name: 'Apple', type: 'Fruits' },
        { name: 'Banana', type: 'Fruits' },
        { name: 'Pineapple', type: 'Fruits' },
        { name: 'Strawberry', type: 'Fruits' },
        { name: 'Broccoli', type: 'Vegetables' },
        { name: 'Carrot', type: 'Vegetables' },
        { name: 'Jalapeño', type: 'Vegetables' },
        { name: 'Spinach', type: 'Vegetables' }
    ];

    model: ComboboxTemplateItem;

    selectedItem = null;
    selectedItem1 = null;
    selectedItem2 = null;
    selectedItem3 = null;

    onSelect(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem = item.payload;
    }

    onSelect1(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem1 = item.payload;
    }

    onSelect2(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem2 = item.payload;
    }

    onSelect3(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem3 = item.payload;
    }
}
