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
import { IconBusinessSuiteInAppSymbolsExampleComponent } from './examples/icon-businessSuiteInAppSymbols-example.component';
import { IconColorExampleComponent } from './examples/icon-color-example.component';
import { IconExampleComponent } from './examples/icon-example.component';
import { IconTNTExampleComponent } from './examples/icon-tnt-example.component';

const iconSrc = 'icon-example.component.html';
const iconSrcTs = 'icon-example.component.ts';
const iconTNTSrc = 'icon-tnt-example.component.html';
const iconTNTSrcTs = 'icon-tnt-example.component.ts';
const iconBusinessSuiteInAppSymbolsSrc = 'icon-businessSuiteInAppSymbols-example.component.html';
const iconBusinessSuiteInAppSymbolsTs = 'icon-businessSuiteInAppSymbols-example.component.ts';
const iconColorExampleTs = 'icon-color-example.component.ts';
const iconColorExampleScss = 'icon-example.component.scss';

@Component({
    selector: 'app-icon',
    templateUrl: './icon-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        IconExampleComponent,
        CodeExampleComponent,
        IconBusinessSuiteInAppSymbolsExampleComponent,
        IconTNTExampleComponent,
        IconColorExampleComponent,
        SeparatorComponent
    ]
})
export class IconDocsComponent {
    iconExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconSrc),
            fileName: 'icon-example',
            component: 'IconExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconSrcTs),
            fileName: 'icon-example',
            component: 'IconExampleComponent',
            scssFileCode: getAssetFromModuleAssets(iconColorExampleScss)
        }
    ];

    iconTNTExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconTNTSrc),
            fileName: 'icon-tnt-example',
            component: 'IconTNTExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTNTSrcTs),
            fileName: 'icon-tnt-example',
            component: 'IconTNTExampleComponent',
            scssFileCode: getAssetFromModuleAssets(iconColorExampleScss)
        }
    ];

    iconBusinessSuiteInAppSymbolsExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconBusinessSuiteInAppSymbolsSrc),
            fileName: 'icon-businessSuiteInAppSymbols-example',
            component: 'IconBusinessSuiteInAppSymbolsExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconBusinessSuiteInAppSymbolsTs),
            fileName: 'icon-businessSuiteInAppSymbols-example',
            component: 'IconBusinessSuiteInAppSymbolsExampleComponent',
            scssFileCode: getAssetFromModuleAssets(iconColorExampleScss)
        }
    ];

    iconColorExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconColorExampleTs),
            fileName: 'icon-color-example',
            component: 'IconColorExampleComponent'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(iconColorExampleScss),
            fileName: 'icon-color-example'
        }
    ];
}
