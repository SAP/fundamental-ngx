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
import { InfoLabelExampleComponent } from './examples/info-label-example.component';

const InfoLableExample = 'info-label-example.component.html';

@Component({
    selector: 'app-info-label',
    templateUrl: './info-label-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        InfoLabelExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        DescriptionComponent
    ]
})
export class InfoLabelDocsComponent {
    defaultInfoLabelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(InfoLableExample),
            fileName: 'info-label-example',
            component: 'InfoLabelExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets('info-label-example.component.ts'),
            fileName: 'info-label-example',
            component: 'InfoLabelExampleComponent'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets('info-label-example.component.scss'),
            fileName: 'info-label-example',
            component: 'InfoLabelExampleComponent'
        }
    ];
}
