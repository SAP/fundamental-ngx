import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { ThemingBridgeSampleComponent } from './examples/theming-bridge-sample';

const bridgeSampleHtml = 'theming-bridge-sample.html';
const bridgeSampleTs = 'theming-bridge-sample.ts';

@Component({
    selector: 'ui5-theming-docs',
    templateUrl: './theming-docs.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        SeparatorComponent,
        ThemingBridgeSampleComponent
    ]
})
export class ThemingDocs {
    bridgeExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(bridgeSampleHtml),
            fileName: 'theming-bridge-sample'
        },
        {
            language: 'typescript',
            component: 'ThemingBridgeSampleComponent',
            code: getAssetFromModuleAssets(bridgeSampleTs),
            fileName: 'theming-bridge-sample'
        }
    ];
}
