import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { SidePanelBadgesExampleComponent } from './examples/side-panel-badges-example.component';
import { SidePanelBasicExampleComponent } from './examples/side-panel-basic-example.component';
import { SidePanelOverflowExampleComponent } from './examples/side-panel-overflow-example.component';
import { SidePanelSingleActionExampleComponent } from './examples/side-panel-single-action-example.component';

const exampleScssCode = 'side-panel.component.scss';

const basicExampleHtmlCode = 'side-panel-basic-example.component.html';
const basicExampleTsCode = 'side-panel-basic-example.component.ts';

const badgesExampleHtmlCode = 'side-panel-badges-example.component.html';
const badgesExampleTsCode = 'side-panel-badges-example.component.ts';

const singleActionExampleHtmlCode = 'side-panel-single-action-example.component.html';
const singleActionExampleTsCode = 'side-panel-single-action-example.component.ts';

const overflowExampleHtmlCode = 'side-panel-overflow-example.component.html';
const overflowExampleTsCode = 'side-panel-overflow-example.component.ts';

@Component({
    templateUrl: './side-panel-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        SidePanelBasicExampleComponent,
        SidePanelBadgesExampleComponent,
        SidePanelSingleActionExampleComponent,
        SidePanelOverflowExampleComponent
    ]
})
export class SidePanelDocsComponent {
    basic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicExampleHtmlCode),
            fileName: 'side-panel-basic-example',
            component: 'SidePanelBasicExampleComponent',
            typescriptFileCode: getAssetFromModuleAssets(basicExampleTsCode),
            scssFileCode: getAssetFromModuleAssets(exampleScssCode)
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(exampleScssCode),
            fileName: 'side-panel',
            component: 'SidePanelBasicExampleComponent',
            scssFileCode: getAssetFromModuleAssets(exampleScssCode)
        }
    ];

    badges: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(badgesExampleHtmlCode),
            fileName: 'side-panel-badges-example',
            component: 'SidePanelBadgesExampleComponent',
            typescriptFileCode: getAssetFromModuleAssets(badgesExampleTsCode),
            scssFileCode: getAssetFromModuleAssets(exampleScssCode)
        }
    ];

    singleAction: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(singleActionExampleHtmlCode),
            fileName: 'side-panel-single-action-example',
            component: 'SidePanelSingleActionExampleComponent',
            typescriptFileCode: getAssetFromModuleAssets(singleActionExampleTsCode),
            scssFileCode: getAssetFromModuleAssets(exampleScssCode)
        }
    ];

    overflow: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(overflowExampleHtmlCode),
            fileName: 'side-panel-overflow-example',
            component: 'SidePanelOverflowExampleComponent',
            typescriptFileCode: getAssetFromModuleAssets(overflowExampleTsCode),
            scssFileCode: getAssetFromModuleAssets(exampleScssCode)
        }
    ];
}
