import { FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-multiselect-checkbox',
    templateUrl: 'platform-multiselect-checkbox.component.html'
})
export class PlatformCozyChekboxExampleComponent {
    field1: string[] = [];
    field2: string[] = ['vega'];

    form1 = new FormGroup({
        einstein: new FormControl(),
        newton: new FormControl()
    });
    form1Data = new Form1data([], ['newton']);

    public checkedChangeFunction(): void {}

    public indeterminateChangeFunction(): void {}

    public changeFunction(): void {}
}
class Form1data {
    constructor(public einstein: string[], public newton: string[]) {}
}
