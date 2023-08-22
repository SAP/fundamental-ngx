import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import {
    TitleSemanticExampleComponent,
    TitleVisualExampleComponent,
    TitleElisionExampleComponent,
    TitleWrappingExampleComponent
} from './examples/title-examples.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const titleSemanticHtml = 'title-semantic-example.component.html';
const titleElisionHtml = 'title-elision-example.component.html';
const titleVisualHtml = 'title-visual-example.component.html';
const titleWrappingHtml = 'title-wrapping-example.component.html';

@Component({
    selector: 'app-title',
    templateUrl: './title-docs.component.html',
    standalone: true,
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
