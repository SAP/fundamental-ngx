import { Component, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { SelectModule } from '@fundamental-ngx/core/select';

@Component({
    selector: 'fd-select-custom-trigger',
    templateUrl: './select-custom-trigger.component.html',
    styleUrls: ['./select-custom-trigger.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [SelectModule, IconComponent]
})
export class SelectCustomTriggerComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];

    selectedValue: string;
}
