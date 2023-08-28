import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormControlModule, FormItemModule, FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-busy-indicator-wrapper-example',
    templateUrl: './busy-indicator-wrapper-example.component.html',
    standalone: true,
    imports: [BusyIndicatorComponent, FormsModule, FormItemModule, FormLabelModule, FormControlModule, ButtonModule]
})
export class BusyIndicatorWrapperExampleComponent {
    loading = true;
}
