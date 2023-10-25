import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormControlComponent, FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-busy-indicator-wrapper-example',
    templateUrl: './busy-indicator-wrapper-example.component.html',
    standalone: true,
    imports: [
        BusyIndicatorComponent,
        FormsModule,
        FormItemComponent,
        FormLabelComponent,
        FormControlComponent,
        ButtonModule
    ]
})
export class BusyIndicatorWrapperExampleComponent {
    loading = true;
}
