import { Component, signal } from '@angular/core';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';

@Component({
    selector: 'ui5-text-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [Text]
})
export class TextBasicSample {
    readonly text = signal(
        'This is a basic text component with default configuration. It displays text content with standard formatting and behavior.'
    );
}
