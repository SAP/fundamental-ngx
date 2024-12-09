import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import {
    TitleElisionExampleComponent,
    TitleSemanticExampleComponent,
    TitleVisualExampleComponent,
    TitleWrappingExampleComponent
} from './examples/title-examples.component';

const titleSemanticHtml = 'title-semantic-example.component.html';
const titleElisionHtml = 'title-elision-example.component.html';
const titleVisualHtml = 'title-visual-example.component.html';
const titleWrappingHtml = 'title-wrapping-example.component.html';

@Component({
    selector: 'app-title',
    templateUrl: './title-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        TitleSemanticExampleComponent,
        CodeExampleComponent,
        TitleVisualExampleComponent,
        TitleElisionExampleComponent,
        TitleWrappingExampleComponent
    ]
})
export class TitleDocsComponent {
    titleSemanticExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(titleSemanticHtml),
            fileName: 'title-semantic-example'
        }
    ];

    titleElisionExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(titleElisionHtml),
            fileName: 'title-elision-example'
        }
    ];

    titleVisualExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(titleVisualHtml),
            fileName: 'title-visual-example'
        }
    ];

    titleWrappingExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(titleWrappingHtml),
            fileName: 'title-wrapping-example'
        }
    ];
}
