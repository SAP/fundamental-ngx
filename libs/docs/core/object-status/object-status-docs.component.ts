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
import { ObjectStatusDefaultExampleComponent } from './examples/object-status-default-example.component';
import { ObjectStatusInvertedExampleComponent } from './examples/object-status-inverted-example.component';
import { ObjectStatusLargeExampleComponent } from './examples/object-status-large-example.component';

const objectStatusExamplesScss = 'object-status-examples.component.scss';

const objectStatusDefaultTs = 'object-status-default-example.component.ts';
const objectStatusDefaultHtml = 'object-status-default-example.component.html';
const objectStatusInvertedExampleTs = 'object-status-inverted-example.component.ts';
const objectStatusInvertedExample = 'object-status-inverted-example.component.html';
const objectStatusLargeExample = 'object-status-large-example.component.html';
const objectStatusLargeExampleTs = 'object-status-large-example.component.ts';

@Component({
    selector: 'app-object-status',
    templateUrl: './object-status-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        ObjectStatusDefaultExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        DescriptionComponent,
        ObjectStatusInvertedExampleComponent,
        ObjectStatusLargeExampleComponent
    ]
})
export class ObjectStatusDocsComponent {
    defaultObjectStatusHtmlType: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(objectStatusDefaultTs),
            fileName: 'object-status-default-example',
            component: 'ObjectStatusDefaultExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(objectStatusDefaultHtml),
            fileName: 'object-status-default-example'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(objectStatusExamplesScss),
            fileName: 'object-status-examples',
            component: 'ObjectStatusDefaultExample',
            scssFileCode: getAssetFromModuleAssets(objectStatusExamplesScss)
        }
    ];

    ObjectStatusInvertedExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(objectStatusInvertedExampleTs),
            fileName: 'object-status-inverted-example',
            component: 'ObjectStatusInvertedExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(objectStatusInvertedExample),
            fileName: 'object-status-inverted-example'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(objectStatusExamplesScss),
            fileName: 'object-status-examples',
            component: 'ObjectStatusDefaultExample',
            scssFileCode: getAssetFromModuleAssets(objectStatusExamplesScss)
        }
    ];

    ObjectStatusLargeExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(objectStatusLargeExampleTs),
            fileName: 'object-status-large-example',
            component: 'ObjectStatusLargeExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(objectStatusLargeExample),
            fileName: 'object-status-large-example'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(objectStatusExamplesScss),
            fileName: 'object-status-examples',
            component: 'ObjectStatusDefaultExample',
            scssFileCode: getAssetFromModuleAssets(objectStatusExamplesScss)
        }
    ];
}
