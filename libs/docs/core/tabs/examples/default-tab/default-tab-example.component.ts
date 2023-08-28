import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { TabsModule } from '@fundamental-ngx/core/tabs';

@Component({
    selector: 'fd-default-tab-example',
    templateUrl: './default-tab-example.component.html',
    standalone: true,
    imports: [FormLabelModule, TabsModule, ButtonModule, NgIf]
})
export class DefaultTabExampleComponent {
    hide = true;
}
