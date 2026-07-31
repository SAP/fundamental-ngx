import { Component } from '@angular/core';
import { FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';

@Component({
    selector: 'fd-input-group-button-example',
    templateUrl: './input-group-button-example.component.html',
    imports: [FormItemComponent, FormLabelComponent, InputGroupModule]
})
export class InputGroupButtonExampleComponent {}
