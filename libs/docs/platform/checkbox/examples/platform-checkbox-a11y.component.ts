import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '@fundamental-ngx/platform/form';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-checkbox-a11y',
    templateUrl: 'platform-checkbox-a11y.component.html',
    standalone: true,
    imports: [FdpFormGroupModule, CheckboxComponent, FormsModule]
})
export class PlatformChekboxA11yExampleComponent {
    checkboxA11y1 = '';
    checkboxA11y2 = '';
    checkboxA11y3 = '';
}
