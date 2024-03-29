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
import {
    PlatformInfoLabelExampleComponent,
    PlatformInfoLableAriaLabelExampleComponent,
    PlatformInfoLableNumericIconExampleComponent,
    PlatformInfoLableTextExampleComponent,
    PlatformInfoLableTextIconExampleComponent
} from './examples/platform-info-label-example.component';

const PlatformInfoLableDefaultExample = 'platform-info-label-example.component.html';
const PlatformInfoLableNumericExample = 'platform-info-label-numeric-example.component.html';
const PlatformTextAndIconInfoLableExample = 'platform-info-label-text-and-icon-example.component.html';
const PlatfromInfoLableTextExample = 'platform-info-label-text-example.component.html';

const PlatfromInfoLableAriaLabelExampleScss = 'platform-info-label-example.component.scss';
const PlatfromInfoLableAriaLabelExample = 'platform-info-label-aria-label-example.component.html';

@Component({
    selector: 'fd-platform-info-label-docs',
    templateUrl: './platform-info-label-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        PlatformInfoLabelExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        DescriptionComponent,
        PlatformInfoLableTextExampleComponent,
        PlatformInfoLableTextIconExampleComponent,
        PlatformInfoLableNumericIconExampleComponent,
        PlatformInfoLableAriaLabelExampleComponent
    ]
})
export class PlatformInfoLabelDocsComponent {
    platformDefaultInfoLabelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformInfoLableDefaultExample),
            fileName: 'platform-info-label-example'
        }
    ];
    platformTextInfoLabelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatfromInfoLableTextExample),
            fileName: 'platform-info-label-example'
        }
    ];
    platformTextAndIconInfoLabelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformTextAndIconInfoLableExample),
            fileName: 'platform-info-label-example'
        }
    ];
    platformNumericInfoLabelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformInfoLableNumericExample),
            fileName: 'platform-info-label-numeric-example'
        }
    ];
    platformAraiaLabelInfoLabelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatfromInfoLableAriaLabelExample),
            fileName: 'platform-info-label-aria-label-example',
            scssFileCode: getAssetFromModuleAssets(PlatfromInfoLableAriaLabelExampleScss)
        }
    ];
}
