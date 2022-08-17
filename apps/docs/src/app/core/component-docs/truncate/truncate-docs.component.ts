import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import truncateTs from '!./examples/truncate-example.component.ts?raw';
import truncateTextTs from '!./examples/truncate-text-example.component.ts?raw';

@Component({
    selector: 'app-truncate',
    templateUrl: './truncate-docs.component.html'
})
export class TruncateDocsComponent {
    truncate: ExampleFile[] = [
        {
            language: 'TypeScript',
            code: truncateTs,
            fileName: 'truncate-example',
            component: 'TruncateExampleComponent'
        }
    ];

    truncateText: ExampleFile[] = [
        {
            language: 'TypeScript',
            code: truncateTextTs,
            fileName: 'truncate-text-example',
            component: 'TruncateTextExampleComponent'
        }
    ];
}
