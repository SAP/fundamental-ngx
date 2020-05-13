import { Component } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-select-mobile-example',
    templateUrl: './select-mobile-example.component.html'
})
export class SelectMobileExampleComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    selectedValue: string;

    constructor(private _dialogService: DialogService) {}
}
