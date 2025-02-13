import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormControlComponent, FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-busy-indicator-wrapper-example',
    templateUrl: './busy-indicator-wrapper-example.component.html',
    imports: [
        BusyIndicatorComponent,
        FormsModule,
        FormItemComponent,
        FormLabelComponent,
        FormControlComponent,
        ButtonComponent
    ]
})
export class BusyIndicatorWrapperExampleComponent {
    loading = true;
}
