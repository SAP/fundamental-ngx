import { Component } from '@angular/core';
import { FormControlComponent, FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-input-inline-help-example',
    templateUrl: './input-inline-help-example.component.html',
    imports: [FormItemComponent, FormLabelComponent, FormControlComponent]
})
export class InputInlineHelpExampleComponent {}
