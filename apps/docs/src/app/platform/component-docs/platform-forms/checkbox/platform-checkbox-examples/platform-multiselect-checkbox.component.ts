import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-multiselect-checkbox',
    templateUrl: 'platform-multiselect-checkbox.component.html'
})
export class PlatformCozyChekboxExampleComponent {
    field1: string[] = [];
    field2: string[] = ['vega'];
    field3: string[] = [];
    field4: string[] = ['altair', 'deneb'];

    form1 = new FormGroup({});
    form1Data = new Form1data([], ['newton']);

    form2 = new FormGroup({});

    form3 = new FormGroup({});
    form3data = new Form3data(['faraday', 'edison']);

    public checkedChangeFunction(): void {}

    public indeterminateChangeFunction(): void {}

    public changeFunction(): void {}
}
class Form1data {
    constructor(public einstein: string[], public newton: string[]) {}
}

class Form3data {
    constructor(public scientists: string[]) {}
}
