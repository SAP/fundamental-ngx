import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const PlatformObjectStatusDefaultExampleScss = 'platform-object-status-example.component.scss';
const PlatformObjectStatusDefaultExample = 'platform-object-status-example.component.html';
const PlatformObjectStatusTextExample = 'platform-object-status-text-example.component.html';
const PlatformObjectStatusGenericTextExample = 'platform-object-status-generic-text-example.component.html';
const PlatformObjectStatusTextIconExample = 'platform-object-status-icon-text-example.component.html';
const PlatformObjectStatusClickableAndIConExample = 'platform-object-status-clickable-and-icon-example.component.html';
const PlatformObjectStatusInvertedTextExample = 'platform-object-status-inverted-example.component.html';
const PlatformObjectStatusInvertedGenericExample =
    'platform-object-status-inverted-generic-text-example.component.html';
const PlatformObjectStatusLargeExample = 'platform-object-status-large-example.component.html';
const PlatformObjectStatusClickableAndIconExampleTs = 'platform-object-status-clickable-and-icon-example.component.ts';
const PlatformObjectStatusLargeExampleTs = 'platform-object-status-large-example.component.ts';

@Component({
    selector: 'fdp-platform-object-status-docs',
    templateUrl: './platform-object-status-docs.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformObjectStatusDocsComponent {
    platformDefaultObjectStatusHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformObjectStatusDefaultExample),
            fileName: 'platform-object-status-example',
            scssFileCode: getAssetFromModuleAssets(PlatformObjectStatusDefaultExampleScss)
        }
    ];

    platformObjectStatusTextExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformObjectStatusTextExample),
            fileName: 'platform-object-status-text-example',
            scssFileCode: getAssetFromModuleAssets(PlatformObjectStatusDefaultExampleScss)
        }
    ];

    platformObjectStatusTextIconExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformObjectStatusGenericTextExample),
            fileName: 'platform-object-status-generic-text-example',
            scssFileCode: getAssetFromModuleAssets(PlatformObjectStatusDefaultExampleScss)
        }
    ];

    platformObjectStatusNumericIconExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformObjectStatusTextIconExample),
            fileName: 'platform-object-status-icon-text-example',
            scssFileCode: getAssetFromModuleAssets(PlatformObjectStatusDefaultExampleScss)
        }
    ];

    platformObjectStatusclickableAndIconExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformObjectStatusClickableAndIConExample),
            fileName: 'platform-object-status-clickable-and-icon-example',
            scssFileCode: getAssetFromModuleAssets(PlatformObjectStatusDefaultExampleScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(PlatformObjectStatusClickableAndIconExampleTs),
            fileName: 'platform-object-status-clickable-and-icon-example',
            component: 'PlatformObjectStatusClickableAndIconExampleComponent'
        }
    ];

    platformObjectStatusInvertedExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformObjectStatusInvertedTextExample),
            fileName: 'platform-object-status-inverted-example',
            scssFileCode: getAssetFromModuleAssets(PlatformObjectStatusDefaultExampleScss)
        }
    ];

    platformObjectStatusInverterdGenericExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformObjectStatusInvertedGenericExample),
            fileName: 'platform-object-status-inverted-generic-text-example',
            scssFileCode: getAssetFromModuleAssets(PlatformObjectStatusDefaultExampleScss)
        }
    ];

    platformObjectStatusLargeExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformObjectStatusLargeExample),
            fileName: 'platform-object-status-large-example',
            scssFileCode: getAssetFromModuleAssets(PlatformObjectStatusDefaultExampleScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(PlatformObjectStatusLargeExampleTs),
            fileName: 'platform-object-status-large-example',
            component: 'PlatformObjectStatusLargeExampleComponent'
        }
    ];
}
