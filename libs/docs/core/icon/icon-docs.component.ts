import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { IconTNTExampleComponent } from './examples/icon-tnt-example.component';
import { IconBusinessSuiteInAppSymbolsExampleComponent } from './examples/icon-businessSuiteInAppSymbols-example.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { IconExampleComponent } from './examples/icon-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

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
