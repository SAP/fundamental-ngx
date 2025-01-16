import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { PlatformObjectStatusClickableAndIconExampleComponent } from './examples/platform-object-status-clickable-and-icon-example.component';
import {
    PlatformObjectStatusExampleComponent,
    PlatformObjectStatusInvertedTextExampleComponent,
    PlatformObjectStatusTextExampleComponent,
    PlatformObjectStatusTextIconExampleComponent
} from './examples/platform-object-status-example.component';
import { PlatformObjectStatusGenericExampleComponent } from './examples/platform-object-status-generic-text-example.component';
import { PlatformObjectStatusInvertedGenericTextExampleComponent } from './examples/platform-object-status-inverted-generic-text-example.component';
import { PlatformObjectStatusLargeExampleComponent } from './examples/platform-object-status-large-example.component';

const PlatformObjectStatusDefaultExampleScss = 'platform-object-status-example.component.scss';
const PlatformObjectStatusDefaultExample = 'platform-object-status-example.component.html';
const PlatformObjectStatusTextExample = 'platform-object-status-text-example.component.html';
const PlatformObjectStatusGenericTextExample = 'platform-object-status-generic-text-example.component.html';
const platformObjectStatusGenericTextExampleTs = 'platform-object-status-generic-text-example.component.ts';
const PlatformObjectStatusTextIconExample = 'platform-object-status-icon-text-example.component.html';
const PlatformObjectStatusClickableAndIConExample = 'platform-object-status-clickable-and-icon-example.component.html';
const PlatformObjectStatusInvertedTextExample = 'platform-object-status-inverted-example.component.html';
const PlatformObjectStatusInvertedGenericExample =
    'platform-object-status-inverted-generic-text-example.component.html';
const platformObjectStatusInvertedGenericExampleTs =
    'platform-object-status-inverted-generic-text-example.component.ts';
const PlatformObjectStatusLargeExample = 'platform-object-status-large-example.component.html';
const PlatformObjectStatusClickableAndIconExampleTs = 'platform-object-status-clickable-and-icon-example.component.ts';
const PlatformObjectStatusLargeExampleTs = 'platform-object-status-large-example.component.ts';

@Component({
    selector: 'fdp-platform-object-status-docs',
    templateUrl: './platform-object-status-docs.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformObjectStatusExampleComponent,
        CodeExampleComponent,
        PlatformObjectStatusTextExampleComponent,
        SeparatorComponent,
        PlatformObjectStatusTextIconExampleComponent,
        PlatformObjectStatusGenericExampleComponent,
        PlatformObjectStatusClickableAndIconExampleComponent,
        PlatformObjectStatusInvertedTextExampleComponent,
        PlatformObjectStatusInvertedGenericTextExampleComponent,
        PlatformObjectStatusLargeExampleComponent
    ]
})
export class PlatformObjectStatusDocsComponent {
    platformDefaultObjectStatusHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformObjectStatusDefaultExample),
            fileName: 'platform-object-status-example'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(PlatformObjectStatusDefaultExampleScss),
            fileName: 'platform-object-status-example'
        }
    ];

    platformObjectStatusTextExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformObjectStatusTextExample),
            fileName: 'platform-object-status-text-example'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(PlatformObjectStatusDefaultExampleScss),
            fileName: 'platform-object-status-example'
        }
    ];

    platformObjectStatusGenericTextExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformObjectStatusGenericTextExample),
            fileName: 'platform-object-status-generic-text-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformObjectStatusGenericTextExampleTs),
            fileName: 'platform-object-status-generic-text-example',
            component: 'PlatformObjectStatusGenericExampleComponent'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(PlatformObjectStatusDefaultExampleScss),
            fileName: 'platform-object-status-example'
        }
    ];

    platformObjectStatusNumericIconExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformObjectStatusTextIconExample),
            fileName: 'platform-object-status-icon-text-example'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(PlatformObjectStatusDefaultExampleScss),
            fileName: 'platform-object-status-example'
        }
    ];

    platformObjectStatusclickableAndIconExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformObjectStatusClickableAndIConExample),
            fileName: 'platform-object-status-clickable-and-icon-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(PlatformObjectStatusClickableAndIconExampleTs),
            fileName: 'platform-object-status-clickable-and-icon-example',
            component: 'PlatformObjectStatusClickableAndIconExampleComponent'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(PlatformObjectStatusDefaultExampleScss),
            fileName: 'platform-object-status-example'
        }
    ];

    platformObjectStatusInvertedExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformObjectStatusInvertedTextExample),
            fileName: 'platform-object-status-inverted-example'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(PlatformObjectStatusDefaultExampleScss),
            fileName: 'platform-object-status-example'
        }
    ];

    platformObjectStatusInverterdGenericExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformObjectStatusInvertedGenericExample),
            fileName: 'platform-object-status-inverted-generic-text-example'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(PlatformObjectStatusDefaultExampleScss),
            fileName: 'platform-object-status-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformObjectStatusInvertedGenericExampleTs),
            fileName: 'platform-object-status-inverted-generic-text-example',
            component: 'PlatformObjectStatusInvertedGenericTextExampleComponent'
        }
    ];

    platformObjectStatusLargeExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformObjectStatusLargeExample),
            fileName: 'platform-object-status-large-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(PlatformObjectStatusLargeExampleTs),
            fileName: 'platform-object-status-large-example',
            component: 'PlatformObjectStatusLargeExampleComponent'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(PlatformObjectStatusDefaultExampleScss),
            fileName: 'platform-object-status-example'
        }
    ];
}
