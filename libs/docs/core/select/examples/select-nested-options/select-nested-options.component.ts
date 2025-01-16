import { JsonPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ListModule, ListSecondaryDirective } from '@fundamental-ngx/core/list';
import { SelectModule } from '@fundamental-ngx/core/select';

@Component({
    selector: 'fd-select-nested-options',
    templateUrl: './select-nested-options.component.html',
    styleUrls: ['select-nested-options.component.scss'],
    imports: [SelectModule, ListModule, NgClass, ListSecondaryDirective, JsonPipe]
})
export class SelectNestedOptionsComponent {
    selectedValue: string;

    fruits: { name: string; kCal: string }[] = [
        { name: 'Apple', kCal: '49.05' },
        { name: 'Pineapple', kCal: '50' },
        { name: 'Strawberry', kCal: '32' }
    ];

    vegetables: { name: string; kCal: string }[] = [
        { name: 'Cabbage', kCal: '23' },
        { name: 'Carrot', kCal: '35' },
        { name: 'Leek', kCal: '31' }
    ];
}
