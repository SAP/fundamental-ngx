import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { ProgressIndicatorAnimationComponent as ProgressIndicatorAnimationComponent_1 } from './examples/progress-indicator-animation.component';
import { ProgressIndicatorDefaultComponent as ProgressIndicatorDefaultComponent_1 } from './examples/progress-indicator-default.component';
import { ProgressIndicatorStateComponent as ProgressIndicatorStateComponent_1 } from './examples/progress-indicator-state.component';
import { ProgressIndicatorTruncationComponent as ProgressIndicatorTruncationComponent_1 } from './examples/progress-indicator-truncation.component';

const ProgressIndicatorDefaultComponent = 'progress-indicator-default.component.html';
const ProgressIndicatorDefaultComponentTs = 'progress-indicator-default.component.ts';
const ProgressIndicatorTruncationComponent = 'progress-indicator-truncation.component.html';
const ProgressIndicatorTruncationComponentTs = 'progress-indicator-truncation.component.ts';
const ProgressIndicatorAnimationComponent = 'progress-indicator-animation.component.html';
const ProgressIndicatorAnimationComponentTs = 'progress-indicator-animation.component.ts';
const ProgressIndicatorStateComponent = 'progress-indicator-state.component.html';
const ProgressIndicatorStateComponentTs = 'progress-indicator-state.component.ts';

@Component({
    selector: 'fd-progress-indicator-docs',
    templateUrl: './progress-indicator-docs.component.html',
    styleUrls: ['progress-indicator-docs.component.scss'],
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        ProgressIndicatorDefaultComponent_1,
        CodeExampleComponent,
        SeparatorComponent,
        ProgressIndicatorStateComponent_1,
        ProgressIndicatorTruncationComponent_1,
        ProgressIndicatorAnimationComponent_1
    ]
})
export class ProgressIndicatorDocsComponent {
    defaultProgressIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(ProgressIndicatorDefaultComponent),
            fileName: 'progress-indicator-default'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(ProgressIndicatorDefaultComponentTs),
            fileName: 'progress-indicator-default',
            component: 'ProgressIndicatorDefaultComponent'
        }
    ];
    stateProgressIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(ProgressIndicatorStateComponent),
            fileName: 'progress-indicator-state'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(ProgressIndicatorStateComponentTs),
            fileName: 'progress-indicator-state',
            component: 'ProgressIndicatorStateComponent'
        }
    ];
    truncationProgressIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(ProgressIndicatorTruncationComponent),
            fileName: 'progress-indicator-truncation'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(ProgressIndicatorTruncationComponentTs),
            fileName: 'progress-indicator-truncation',
            component: 'ProgressIndicatorTruncationComponent'
        }
    ];
    animationProgressIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(ProgressIndicatorAnimationComponent),
            fileName: 'progress-indicator-animation'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(ProgressIndicatorAnimationComponentTs),
            fileName: 'progress-indicator-animation',
            component: 'ProgressIndicatorAnimationComponent'
        }
    ];
}
