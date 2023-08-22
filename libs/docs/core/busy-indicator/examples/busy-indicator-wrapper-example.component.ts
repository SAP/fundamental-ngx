import { Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { FormItemModule } from '@fundamental-ngx/core/form';
import { FormsModule } from '@angular/forms';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';

@Component({
    selector: 'fd-busy-indicator-wrapper-example',
    templateUrl: './busy-indicator-wrapper-example.component.html',
    standalone: true,
    imports: [BusyIndicatorComponent, FormsModule, FormItemModule, FormLabelModule, FormControlModule, ButtonModule]
})
export class BusyIndicatorWrapperExampleComponent {
    loading = true;
}
