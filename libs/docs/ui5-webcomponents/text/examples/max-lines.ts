import { Component, signal } from '@angular/core';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';

@Component({
    selector: 'ui5-text-max-lines-sample',
    templateUrl: './max-lines.html',
    standalone: true,
    imports: [Text]
})
export class TextMaxLinesSample {
    readonly longText = signal(
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`
    );

    readonly maxLinesExamples = signal([
        { maxLines: 1, description: 'Single line (maxLines: 1)' },
        { maxLines: 2, description: 'Two lines (maxLines: 2)' },
        { maxLines: 3, description: 'Three lines (maxLines: 3)' },
        { maxLines: Infinity, description: 'No limit (maxLines: Infinity)' }
    ]);
}
