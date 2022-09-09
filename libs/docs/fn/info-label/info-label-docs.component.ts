import { Component } from '@angular/core';

const infoLabelDefaultExampleHtml = 'default/info-label-default-example.component.html';
const infoLabelDefaultExampleTs = 'default/info-label-default-example.component.ts';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-info-label',
    templateUrl: './info-label-docs.component.html'
})
export class InfoLabelDocsComponent {
    infoLabelDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'info-label-default-example',
            code: getAssetFromModuleAssets(infoLabelDefaultExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(infoLabelDefaultExampleTs),
            fileName: 'info-label-default-example',
            component: 'InfoLabelDefaultExampleComponent'
        }
    ];
}
