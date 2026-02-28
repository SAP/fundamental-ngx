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
import { ContentDensityBasicSampleComponent } from './examples/content-density-basic-sample';

const basicSampleHtml = 'content-density-basic-sample.html';
const basicSampleTs = 'content-density-basic-sample.ts';

@Component({
    selector: 'ui5-content-density-docs',
    templateUrl: './content-density-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        SeparatorComponent,
        ContentDensityBasicSampleComponent
    ]
})
export class ContentDensityDocs {
    basicExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'content-density-basic-sample'
        },
        {
            language: 'typescript',
            component: 'ContentDensityBasicSampleComponent',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'content-density-basic-sample'
        }
    ];
}
