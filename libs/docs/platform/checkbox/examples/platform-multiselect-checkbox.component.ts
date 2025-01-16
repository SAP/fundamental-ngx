import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { CheckboxComponent, FdpFormGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-multiselect-checkbox',
    templateUrl: 'platform-multiselect-checkbox.component.html',
    imports: [
        FdpFormGroupModule,
        CheckboxComponent,
        FormsModule,
        ReactiveFormsModule,
        ContentDensityDirective,
        JsonPipe
    ]
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
    constructor(
        public einstein: string[],
        public newton: string[]
    ) {}
}
