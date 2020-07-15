import { Component } from '@angular/core';
import { DIALOG_CONFIG, DialogConfig, MobileModeConfig } from '@fundamental-ngx/core';


const customConfig: DialogConfig = {
    mobile: true,
    verticalPadding: false,
    maxWidth: '320px',
    maxHeight: '640px'
};
@Component({
    selector: 'fd-combobox-example',
    templateUrl: './combobox-example.component.html',
    providers: [
        { provide: DIALOG_CONFIG, useValue: customConfig },
    ]
})
export class ComboboxExampleComponent {
    searchTermOne: string = '';
    searchTermTwo: string = '';
    searchTermThree: string = '';
    searchTermFour: string = '';
    searchTermFive: string = '';

    dropdownValues = [
        'Apple',
        'Pineapple',
        'Banana',
        'Kiwi',
        'Strawberry',
        'Strawberry1',
        'Strawberry2',
        'Strawberry3',
        'Strawberry4',
        'Strawberry5',
        'Strawberry6',
    ];

    secondConfig: MobileModeConfig = {
        title: 'Title',
        approveButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        hasCloseButton: true
    };
}
