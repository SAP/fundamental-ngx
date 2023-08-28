import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { IconBusinessSuiteInAppSymbolsExampleComponent } from './examples/icon-businessSuiteInAppSymbols-example.component';
import { IconExampleComponent } from './examples/icon-example.component';
import { IconTNTExampleComponent } from './examples/icon-tnt-example.component';

const iconSrc = 'icon-example.component.html';
const iconTNTSrc = 'icon-tnt-example.component.html';
const iconBusinessSuiteInAppSymbolsSrc = 'icon-businessSuiteInAppSymbols-example.component.html';

@Component({
    selector: 'app-icon',
    templateUrl: './icon-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        IconExampleComponent,
        CodeExampleComponent,
        IconBusinessSuiteInAppSymbolsExampleComponent,
        IconTNTExampleComponent
    ]
})
export class IconDocsComponent {
    iconExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconSrc),
            fileName: 'icon-example',
            component: 'IconExampleComponent'
        }
    ];

    iconTNTExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconTNTSrc),
            fileName: 'icon-example',
            component: 'IconTNTExampleComponent'
        }
    ];

    iconBusinessSuiteInAppSymbolsExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconBusinessSuiteInAppSymbolsSrc),
            fileName: 'icon-example',
            component: 'IconBusinessSuiteInAppSymbolsExampleComponent'
        }
    ];
}
