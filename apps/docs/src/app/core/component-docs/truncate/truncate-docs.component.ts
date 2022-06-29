import { Component } from '@angular/core';

import truncateTs from '!./examples/truncate-example.component.ts?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

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
}
