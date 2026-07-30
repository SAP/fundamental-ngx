import { Component } from '@angular/core';
import { FormControlComponent, FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-textarea-inline-help-example',
    templateUrl: './textarea-inline-help-example.component.html',
    imports: [FormItemComponent, FormLabelComponent, FormControlComponent]
})
export class TextareaInlineHelpExampleComponent {}
