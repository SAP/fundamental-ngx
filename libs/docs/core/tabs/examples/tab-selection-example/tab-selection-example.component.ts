import { Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { TabsModule } from '@fundamental-ngx/core/tabs';

@Component({
    selector: 'fd-tab-selection-example',
    templateUrl: './tab-selection-example.component.html',
    styleUrls: ['tab-selection-example.component.scss'],
    standalone: true,
    imports: [TabsModule, FormLabelComponent, ButtonModule]
})
export class TabSelectionExampleComponent {}
