import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { I18nBasicSampleComponent } from './examples/i18n-basic-sample';

const basicSampleHtml = 'i18n-basic-sample.html';
const basicSampleTs = 'i18n-basic-sample.ts';

@Component({
    selector: 'ui5-i18n-docs',
    templateUrl: './i18n-docs.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        SeparatorComponent,
        I18nBasicSampleComponent
    ]
})
export class I18nDocs {
    basicExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            fileName: 'i18n-basic-sample'
        },
        {
            language: 'typescript',
            component: 'I18nBasicSampleComponent',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: 'i18n-basic-sample'
        }
    ];
}
