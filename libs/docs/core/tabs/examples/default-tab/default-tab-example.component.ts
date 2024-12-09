import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { TabsModule } from '@fundamental-ngx/core/tabs';

@Component({
    selector: 'fd-default-tab-example',
    templateUrl: './default-tab-example.component.html',
    imports: [FormLabelComponent, TabsModule, ButtonComponent]
})
export class DefaultTabExampleComponent {
    hide = true;
}
