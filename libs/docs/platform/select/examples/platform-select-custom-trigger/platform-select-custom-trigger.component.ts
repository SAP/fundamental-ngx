import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { IconComponent } from '@fundamental-ngx/core/icon';
import { FdpSelectionChangeEvent, PlatformSelectModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-select-custom-trigger',
    templateUrl: './platform-select-custom-trigger.component.html',
    styleUrls: ['./platform-select-custom-trigger.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PlatformSelectModule, IconComponent]
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
