import { Component } from '@angular/core';
import { FormHeaderComponent, FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';

@Component({
    selector: 'fd-input-group-text-example',
    templateUrl: './input-group-text-example.component.html',
    imports: [FormHeaderComponent, FormItemComponent, FormLabelComponent, InputGroupModule]
})
export class InputGroupTextExampleComponent {}
