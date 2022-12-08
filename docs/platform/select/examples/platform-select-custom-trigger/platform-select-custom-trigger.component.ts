import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { FdpSelectionChangeEvent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-select-custom-trigger',
    templateUrl: './platform-select-custom-trigger.component.html',
    styleUrls: ['./platform-select-custom-trigger.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformSelectCustomTriggerComponent {
    selectedValue: string;
    selected: string;

    autoResizeList = [
        'Maximum width is part of the screen furthest to the right.',
        'Apple With less price',
        'Banana With bit more big line',
        'Lorem ipsum dolor sit, amet' + ' consectetur adipisicing elit.',
        'Strawberry',
        'Broccoli',
        'Carrot',
        'Jalapeño',
        'Spinach'
    ];

    onSelect(item: FdpSelectionChangeEvent): void {
        this.selectedValue = item.payload;
    }
}
