import { Component } from '@angular/core';
import { FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';

@Component({
    selector: 'fd-input-group-icon-example',
    templateUrl: './input-group-icon-example.component.html',
    imports: [FormItemComponent, FormLabelComponent, InputGroupModule]
})
export class InputGroupIconExampleComponent {}
