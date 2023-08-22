import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { FormMessageModule } from '@fundamental-ngx/core/form';
import { ListModule } from '@fundamental-ngx/core/list';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { FormItemModule } from '@fundamental-ngx/core/form';

interface ComboboxItem {
    displayedValue: string;
    value: string;
}

@Component({
    selector: 'fd-combobox-forms-example',
    templateUrl: 'combobox-forms-example.component.html',
    styleUrls: ['combobox-forms-example.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        FormItemModule,
        FormLabelModule,
        ComboboxModule,
        ListModule,
        FormMessageModule,
        JsonPipe
    ]
})
export class ComboboxFormsExampleComponent {
    customForm = new FormGroup({
        item: new FormControl(null),
        itemOnDropdownMode: new FormControl(null)
    });

    dropdownValues: ComboboxItem[] = [
        { displayedValue: 'Apple', value: 'AppleValue' },
        { displayedValue: 'Apple', value: 'AppleValue2' },
        { displayedValue: 'Banana', value: 'BananaValue' },
        { displayedValue: 'Kiwi', value: 'KiwiValue' },
        { displayedValue: 'Strawberry', value: 'StrawberryValue' },
        { displayedValue: 'Tomato', value: 'TomatoValue' }
    ];

    myDisplayFunction = (item: ComboboxItem): string => item?.displayedValue ?? '';
}
