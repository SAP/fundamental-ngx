import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import { FormItemComponent, FormLabelComponent, FormMessageComponent } from '@fundamental-ngx/core/form';
import { ListModule } from '@fundamental-ngx/core/list';

interface ComboboxItem {
    displayedValue: string;
    value: string;
}

@Component({
    selector: 'fd-combobox-forms-example',
    templateUrl: 'combobox-forms-example.component.html',
    styleUrls: ['combobox-forms-example.component.scss'],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        FormItemComponent,
        FormLabelComponent,
        ComboboxComponent,
        ListModule,
        FormMessageComponent,
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
