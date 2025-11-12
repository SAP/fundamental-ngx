import { Component, signal } from '@angular/core';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-text-white-space-sample',
    templateUrl: './white-space.html',
    standalone: true,
    imports: [Text]
})
export class WhiteSpaceSample {
    readonly whitespaceText = signal(`     White spaces are preserved on this line.

This line is preceded by an empty line.
	This line is preceded by a tab.`);

    readonly htmlContent = signal(
        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;White spaces with HTML entities.<br><br>This line is preceded by an empty line.<br>&nbsp;&nbsp;&nbsp;&nbsp;This line is preceded by a tab.'
    );
}
