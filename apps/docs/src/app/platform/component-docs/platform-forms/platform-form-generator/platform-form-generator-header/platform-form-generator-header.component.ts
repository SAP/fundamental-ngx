import { Component } from '@angular/core';
import { defaultFormGeneratorHintOptions } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fd-platform-form-generator-header',
    templateUrl: './platform-form-generator-header.component.html'
})
export class PlatformFormGeneratorHeaderComponent {
    defaultHintOptions = Object.keys(defaultFormGeneratorHintOptions).map((propName) => [
        propName,
        JSON.stringify(defaultFormGeneratorHintOptions[propName])
    ]);
}
