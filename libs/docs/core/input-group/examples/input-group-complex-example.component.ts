import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormControlComponent, FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';

@Component({
    selector: 'fd-input-group-complex-example',
    templateUrl: './input-group-complex-example.component.html',
    imports: [FormItemComponent, FormLabelComponent, InputGroupModule, FormControlComponent, ButtonComponent]
})
export class InputGroupComplexExampleComponent {}
