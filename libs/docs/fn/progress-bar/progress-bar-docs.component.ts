import { Component } from '@angular/core';

const progressBarDefaultExampleHtml = 'default/progress-bar-default-example.component.html';
const progressBarDefaultExampleTs = 'default/progress-bar-default-example.component.ts';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar-docs.component.html'
})
export class ProgressBarDocsComponent {
    progressBarDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'progress-bar-default-example',
            code: getAssetFromModuleAssets(progressBarDefaultExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(progressBarDefaultExampleTs),
            fileName: 'progress-bar-default-example',
            component: 'ProgressBarDefaultExampleComponent'
        }
    ];
}
