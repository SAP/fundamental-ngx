import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import ProgressIndicatorDefaultComponent from '!./example/progress-indicator-default.component.html?raw';
import ProgressIndicatorDefaultComponentTs from '!./example/progress-indicator-default.component.ts?raw';
import ProgressIndicatorTruncationComponent from '!./example/progress-indicator-truncation.component.html?raw';
import ProgressIndicatorTruncationComponentTs from '!./example/progress-indicator-truncation.component.ts?raw';
import ProgressIndicatorAnimationComponent from '!./example/progress-indicator-animation.component.html?raw';
import ProgressIndicatorAnimationComponentTs from '!./example/progress-indicator-animation.component.ts?raw';
import ProgressIndicatorStateComponent from '!./example/progress-indicator-state.component.html?raw';
import ProgressIndicatorStateComponentTs from '!./example/progress-indicator-state.component.ts?raw';

@Component({
    selector: 'fd-progress-indicator-docs',
    templateUrl: './progress-indicator-docs.component.html',
    styleUrls: ['progress-indicator-docs.component.scss']
})
export class ProgressIndicatorDocsComponent {
    defaultProgressIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: ProgressIndicatorDefaultComponent,
            fileName: 'progress-indicator-default'
        },
        {
            language: 'typescript',
            code: ProgressIndicatorDefaultComponentTs,
            fileName: 'progress-indicator-default',
            component: 'ProgressIndicatorDefaultComponent'
        }
    ];
    stateProgressIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: ProgressIndicatorStateComponent,
            fileName: 'progress-indicator-state'
        },
        {
            language: 'typescript',
            code: ProgressIndicatorStateComponentTs,
            fileName: 'progress-indicator-state',
            component: 'ProgressIndicatorStateComponent'
        }
    ];
    truncationProgressIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: ProgressIndicatorTruncationComponent,
            fileName: 'progress-indicator-truncation'
        },
        {
            language: 'typescript',
            code: ProgressIndicatorTruncationComponentTs,
            fileName: 'progress-indicator-truncation',
            component: 'ProgressIndicatorTruncationComponent'
        }
    ];
    animationProgressIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: ProgressIndicatorAnimationComponent,
            fileName: 'progress-indicator-animation'
        },
        {
            language: 'typescript',
            code: ProgressIndicatorAnimationComponentTs,
            fileName: 'progress-indicator-animation',
            component: 'ProgressIndicatorAnimationComponent'
        }
    ];
}
