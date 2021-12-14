import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as ProgressIndicatorDefaultComponent from '!raw-loader!./example/progress-indicator-default.component.html';
import * as ProgressIndicatorDefaultComponentTs from '!raw-loader!./example/progress-indicator-default.component.ts';
import * as ProgressIndicatorTruncationComponent from '!raw-loader!./example/progress-indicator-truncation.component.html';
import * as ProgressIndicatorTruncationComponentTs from '!raw-loader!./example/progress-indicator-truncation.component.ts';
import * as ProgressIndicatorAnimationComponent from '!raw-loader!./example/progress-indicator-animation.component.html';
import * as ProgressIndicatorAnimationComponentTs from '!raw-loader!./example/progress-indicator-animation.component.ts';
import * as ProgressIndicatorStateComponent from '!raw-loader!./example/progress-indicator-state.component.html';
import * as ProgressIndicatorStateComponentTs from '!raw-loader!./example/progress-indicator-state.component.ts';

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
