import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { SidePanelBasicExampleComponent } from './examples/side-panel-basic-example.component';

const exampleScssCode = 'side-panel.component.scss';

const basicExampleHtmlCode = 'side-panel-basic-example.component.html';
const basicExampleTsCode = 'side-panel-basic-example.component.ts';

@Component({
    templateUrl: './side-panel-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        SidePanelBasicExampleComponent
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
}
