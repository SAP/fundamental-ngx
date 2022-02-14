import { Component } from '@angular/core';

import progressBarDefaultExampleHtml from '!./examples/default/progress-bar-default-example.component.html?raw';
import progressBarDefaultExampleTs from '!./examples/default/progress-bar-default-example.component.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar-docs.component.html'
})
export class ProgressBarDocsComponent {
    progressBarDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'progress-bar-default-example',
            code: progressBarDefaultExampleHtml
        },
        {
            language: 'typescript',
            code: progressBarDefaultExampleTs,
            fileName: 'progress-bar-default-example',
            component: 'ProgressBarDefaultExampleComponent'
        }
    ];
}
