import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { TextComponent } from '@fundamental-ngx/core/text';

@Component({
    selector: 'fd-tab-form-element-example',
    templateUrl: './tab-form-element-example.component.html',
    imports: [FormLabelComponent, TabsModule, ButtonComponent, FormItemComponent, InputGroupModule, TextComponent]
})
export class TabFormElementExampleComponent {}
