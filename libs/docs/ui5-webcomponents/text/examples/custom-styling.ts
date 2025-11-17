import { Component } from '@angular/core';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-text-custom-styling-sample',
    templateUrl: './custom-styling.html',
    standalone: true,
    imports: [Text]
})
export class TextCustomStylingSample {}
