import { Component } from '@angular/core';
import { defaultFormFieldHintOptions } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'app-form-container-header',
    templateUrl: './platform-form-container-header.component.html'
})
export class PlatformFormContainerHeaderComponent {
    defaultHintOptions = Object.keys(defaultFormFieldHintOptions).map((propName) => [
        propName,
        JSON.stringify(defaultFormFieldHintOptions[propName])
    ]);
}
