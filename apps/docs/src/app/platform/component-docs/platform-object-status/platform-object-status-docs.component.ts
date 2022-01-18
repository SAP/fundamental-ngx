import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import PlatformObjectStatusDefaultExampleScss from '!./platform-object-status-example/platform-object-status-example.component.scss?raw';
import PlatformObjectStatusDefaultExample from '!./platform-object-status-example/platform-object-status-example.component.html?raw';
import PlatformObjectStatusTextExample from '!./platform-object-status-example/platform-object-status-text-example.component.html?raw';
import PlatformObjectStatusGenericTextExample from '!./platform-object-status-example/platform-object-status-generic-text-example.component.html?raw';
import PlatformObjectStatusTextIconExample from '!./platform-object-status-example/platform-object-status-icon-text-example.component.html?raw';
import PlatformObjectStatusClickableAndIConExample from '!./platform-object-status-example/platform-object-status-clickable-and-icon-example.component.html?raw';
import PlatformObjectStatusInvertedTextExample from '!./platform-object-status-example/platform-object-status-inverted-example.component.html?raw';
import PlatformObjectStatusInvertedGenericExample from '!./platform-object-status-example/platform-object-status-inverted-generic-text-example.component.html?raw';
import PlatformObjectStatusLargeExample from '!./platform-object-status-example/platform-object-status-large-example.component.html?raw';
import PlatformObjectStatusClickableAndIconExampleTs from '!./platform-object-status-example/platform-object-status-clickable-and-icon-example.component?raw';
import PlatformObjectStatusLargeExampleTs from '!./platform-object-status-example/platform-object-status-large-example.component?raw';

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
            code: PlatformObjectStatusDefaultExample,
            fileName: 'platform-object-status-example',
            scssFileCode: PlatformObjectStatusDefaultExampleScss
        }
    ];

    platformObjectStatusTextExample: ExampleFile[] = [
        {
            language: 'html',
            code: PlatformObjectStatusTextExample,
            fileName: 'platform-object-status-text-example',
            scssFileCode: PlatformObjectStatusDefaultExampleScss
        }
    ];

    platformObjectStatusTextIconExample: ExampleFile[] = [
        {
            language: 'html',
            code: PlatformObjectStatusGenericTextExample,
            fileName: 'platform-object-status-generic-text-example',
            scssFileCode: PlatformObjectStatusDefaultExampleScss
        }
    ];

    platformObjectStatusNumericIconExample: ExampleFile[] = [
        {
            language: 'html',
            code: PlatformObjectStatusTextIconExample,
            fileName: 'platform-object-status-icon-text-example',
            scssFileCode: PlatformObjectStatusDefaultExampleScss
        }
    ];

    platformObjectStatusclickableAndIconExample: ExampleFile[] = [
        {
            language: 'html',
            code: PlatformObjectStatusClickableAndIConExample,
            fileName: 'platform-object-status-clickable-and-icon-example',
            scssFileCode: PlatformObjectStatusDefaultExampleScss
        },
        {
            language: 'typescript',
            code: PlatformObjectStatusClickableAndIconExampleTs,
            fileName: 'platform-object-status-clickable-and-icon-example',
            component: 'PlatformObjectStatusClickableAndIconExampleComponent'
        }
    ];

    platformObjectStatusInvertedExample: ExampleFile[] = [
        {
            language: 'html',
            code: PlatformObjectStatusInvertedTextExample,
            fileName: 'platform-object-status-inverted-example',
            scssFileCode: PlatformObjectStatusDefaultExampleScss
        }
    ];

    platformObjectStatusInverterdGenericExample: ExampleFile[] = [
        {
            language: 'html',
            code: PlatformObjectStatusInvertedGenericExample,
            fileName: 'platform-object-status-inverted-generic-text-example',
            scssFileCode: PlatformObjectStatusDefaultExampleScss
        }
    ];

    platformObjectStatusLargeExample: ExampleFile[] = [
        {
            language: 'html',
            code: PlatformObjectStatusLargeExample,
            fileName: 'platform-object-status-large-example',
            scssFileCode: PlatformObjectStatusDefaultExampleScss
        },
        {
            language: 'typescript',
            code: PlatformObjectStatusLargeExampleTs,
            fileName: 'platform-object-status-large-example',
            component: 'PlatformObjectStatusLargeExampleComponent'
        }
    ];
}
