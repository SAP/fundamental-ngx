import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const iconSrc = 'icon-example.component.html';
const iconTNTSrc = 'icon-tnt-example.component.html';
const iconBusinessSuiteInAppSymbolsSrc = 'icon-businessSuiteInAppSymbols-example.component.html';

@Component({
    selector: 'app-icon',
    templateUrl: './icon-docs.component.html'
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
