import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SwitchComponent } from '@fundamental-ngx/core/switch';

@Component({
    selector: 'fd-switch-sizes-example',
    templateUrl: './switch-sizes-example.component.html',
    styleUrls: ['./switch-sizes-example.component.scss'],
    imports: [FormLabelComponent, SwitchComponent, ContentDensityDirective, FormsModule]
})
export class SwitchSizesExampleComponent {
    checked = true;
}
