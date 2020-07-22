import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as PlatformObjectStatusDefaultExample from '!raw-loader!./platform-object-status-example/platform-object-status-example.component.html';
import * as PlatformObjectStatusTextExample from '!raw-loader!./platform-object-status-example/platform-object-status-text-example.component.html';
import * as PlatformObjectStatusGenericTextExample from '!raw-loader!./platform-object-status-example/platform-object-status-generic-text-example.component.html';
import * as PlatformObjectStatusTextIconExample from '!raw-loader!./platform-object-status-example/platform-object-status-icon-text-example.component.html';
import * as PlatformObjectStatusClickableAndIConExample from '!raw-loader!./platform-object-status-example/platform-object-status-clickable-and-icon-example.component.html';
import * as PlatformObjectStatusInvertedTextExample from '!raw-loader!./platform-object-status-example/platform-object-status-inverted-example.component.html';
import * as PlatformObjectStatusInvertedGenericExample from '!raw-loader!./platform-object-status-example/platform-object-status-inverted-generic-text-example.component.html';
import * as PlatformObjectStatusLargeExample from '!raw-loader!./platform-object-status-example/platform-object-status-large-example.component.html';

@Component({
    selector: 'fdp-platform-object-status-docs',
    templateUrl: './platform-object-status-docs.component.html'
})
export class PlatformObjectStatusDocsComponent {
    platformDefaultObjectStatusHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: PlatformObjectStatusDefaultExample,
            fileName: 'platform-object-status-example'
        }
    ];

    platformObjectStatusTextExample: ExampleFile[] = [
        {
            language: 'html',
            code: PlatformObjectStatusTextExample,
            fileName: 'platform-object-status-text-example'
        }
    ];

    platformObjectStatusTextIconExample: ExampleFile[] = [
        {
            language: 'html',
            code: PlatformObjectStatusGenericTextExample,
            fileName: 'platform-object-status-generic-text-example'
        }
    ];

    platformObjectStatusNumericIconExample: ExampleFile[] = [
        {
            language: 'html',
            code: PlatformObjectStatusTextIconExample,
            fileName: 'platform-object-status-icon-text-example'
        }
    ];

    platformObjectStatusclickableAndIconExample: ExampleFile[] = [
        {
            language: 'html',
            code: PlatformObjectStatusClickableAndIConExample,
            fileName: 'platform-object-status-clickable-and-icon-example'
        }
    ];

    platformObjectStatusInvertedExample: ExampleFile[] = [
        {
            language: 'html',
            code: PlatformObjectStatusInvertedTextExample,
            fileName: 'platform-object-status-inverted-example'
        }
    ];

    platformObjectStatusInverterdGenericExample: ExampleFile[] = [
        {
            language: 'html',
            code: PlatformObjectStatusInvertedGenericExample,
            fileName: 'platform-object-status-inverted-generic-text-example'
        }
    ];

    platformObjectStatusLargeExample: ExampleFile[] = [
        {
            language: 'html',
            code: PlatformObjectStatusLargeExample,
            fileName: 'platform-object-status-large-example'
        }
    ];
}
