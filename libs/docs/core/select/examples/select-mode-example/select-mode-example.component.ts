import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { SelectModule } from '@fundamental-ngx/core/select';

@Component({
    selector: 'fd-select-mode-example',
    templateUrl: './select-mode-example.component.html',
    imports: [SelectModule, ContentDensityDirective]
})
export class SelectModeExampleComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    selectedValue1: string;
    selectedValue2: string;
    selectedValue3: string;
    selectedValue4 = this.options[2];
    selectedValue5 = this.options[0];
}
