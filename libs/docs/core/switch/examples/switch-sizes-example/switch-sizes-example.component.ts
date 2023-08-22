import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { SwitchModule } from '@fundamental-ngx/core/switch';
import { FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-switch-sizes-example',
    templateUrl: './switch-sizes-example.component.html',
    styleUrls: ['./switch-sizes-example.component.scss'],
    standalone: true,
    imports: [FormLabelModule, SwitchModule, ContentDensityDirective, FormsModule]
})
export class SwitchSizesExampleComponent {
    checked = true;
}
