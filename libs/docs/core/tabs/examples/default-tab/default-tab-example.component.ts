import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-default-tab-example',
    templateUrl: './default-tab-example.component.html',
    standalone: true,
    imports: [FormLabelModule, TabsModule, ButtonModule, NgIf]
})
export class DefaultTabExampleComponent {
    hide = true;
}
