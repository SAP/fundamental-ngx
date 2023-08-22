import { Component } from '@angular/core';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { FormItemModule } from '@fundamental-ngx/core/form';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-tab-form-element-example',
    templateUrl: './tab-form-element-example.component.html',
    standalone: true,
    imports: [FormLabelModule, TabsModule, ButtonModule, FormItemModule, InputGroupModule]
})
export class TabFormElementExampleComponent {}
