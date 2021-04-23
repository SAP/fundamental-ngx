import { Component } from '@angular/core';

import * as platformMultiInputSimpleExample from '!raw-loader!./platform-multi-input-example/platform-multi-input-example.component.html';
import * as platformMultiInputSimpmleExampleTs from '!raw-loader!./platform-multi-input-example/platform-multi-input-example.component.ts';
import * as platformMultiInputComplexExample from '!raw-loader!./platform-multi-input-example/platform-multi-input-complex-example.component.html';
import * as platformMultiInputComplexExampleTs from '!raw-loader!./platform-multi-input-example/platform-multi-input-complex-example.component.ts';
import * as platformMultiInputGroupedExample from '!raw-loader!./platform-multi-input-example/platform-multi-input-grouped-example.component.html';
import * as platformMultiInputGroupedExampleTs from '!raw-loader!./platform-multi-input-example/platform-multi-input-grouped-example.component.ts';
import * as platformMultiInputDeclineExample from '!raw-loader!./platform-multi-input-example/platform-multi-input-decline-example.component.html';
import * as platformMultiInputDeclineExampleTs from '!raw-loader!./platform-multi-input-example/platform-multi-input-decline-example.component.ts';
import * as platformMultiInputDisableExample from '!raw-loader!./platform-multi-input-example/platform-multi-input-disabled.component.html';
import * as platformMultiInputDisableExampleTs from '!raw-loader!./platform-multi-input-example/platform-multi-input-disabled.component.ts';
import * as platformMultiInputMobileExample from '!raw-loader!./platform-multi-input-example/platform-multi-input-mobile-example.component.html';
import * as platformMultiInputMobileExampleTs from '!raw-loader!./platform-multi-input-example/platform-multi-input-mobile-example.component.ts';
import * as platformMultiInputReactiveExample from '!raw-loader!./platform-multi-input-example/platform-multi-input-reactive-example.component.html';
import * as platformMultiInputReactiveExampleTs from '!raw-loader!./platform-multi-input-example/platform-multi-input-reactive-example.component.ts';
import * as PlatformMultiInputCompactExampleComponent from '!raw-loader!./platform-multi-input-example/platform-multi-input-compact-example.component.html';
import * as PlatformMultiInputCompactExampleComponentTs from '!raw-loader!./platform-multi-input-example/platform-multi-input-compact-example.component.ts';

import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'fd-platform-multi-input-docs',
    templateUrl: './platform-multi-input-docs.component.html'
})
export class PlatformMultiInputDocsComponent {
    multiInputSimple: ExampleFile[] = [
        {
            language: 'html',
            code: platformMultiInputSimpleExample,
            fileName: 'platform-multi-input-example'
        },
        {
            language: 'typescript',
            code: platformMultiInputSimpmleExampleTs,
            fileName: 'platform-multi-input-example',
            component: 'PlatformMultiInputExampleComponent'
        }
    ];
    multiInputCompact: ExampleFile[] = [
        {
            language: 'html',
            code: PlatformMultiInputCompactExampleComponent,
            fileName: 'platform-multi-input-compact-example'
        },
        {
            language: 'typescript',
            code: PlatformMultiInputCompactExampleComponentTs,
            fileName: 'platform-multi-input-compact-example',
            component: 'PlatformMultiInputCompactExampleComponent'
        }
    ];
    multiInputGrouped: ExampleFile[] = [
        {
            language: 'html',
            code: platformMultiInputComplexExample,
            fileName: 'platform-multi-input-complex-example'
        },
        {
            language: 'typescript',
            code: platformMultiInputComplexExampleTs,
            fileName: 'platform-multi-input-complex-example',
            component: 'PlatformMultiInputComplexExampleComponent'
        }
    ];
    multiInputValueHelp: ExampleFile[] = [
        {
            language: 'html',
            code: platformMultiInputGroupedExample,
            fileName: 'platform-multi-input-grouped-example'
        },
        {
            language: 'typescript',
            code: platformMultiInputGroupedExampleTs,
            fileName: 'platform-multi-input-grouped-example',
            component: 'PlatformMultiInputGroupedExampleComponent'
        }
    ];
    multiInputDecline: ExampleFile[] = [
        {
            language: 'html',
            code: platformMultiInputDeclineExample,
            fileName: 'platform-multi-input-decline-example'
        },
        {
            language: 'typescript',
            code: platformMultiInputDeclineExampleTs,
            fileName: 'platform-multi-input-decline-example',
            component: 'PlatformMultiInputDeclineExampleComponent'
        }
    ];
    multiInputDisable: ExampleFile[] = [
        {
            language: 'html',
            code: platformMultiInputDisableExample,
            fileName: 'platform-multi-input-disabled'
        },
        {
            language: 'typescript',
            code: platformMultiInputDisableExampleTs,
            fileName: 'platform-multi-input-disabled',
            component: 'PlatformMultiInputDisabledExampleComponent'
        }
    ];
    multiInputMobile: ExampleFile[] = [
        {
            language: 'html',
            code: platformMultiInputMobileExample,
            fileName: 'platform-multi-input-mobile-example'
        },
        {
            language: 'typescript',
            code: platformMultiInputMobileExampleTs,
            fileName: 'platform-multi-input-mobile-example',
            component: 'PlatformMultiInputMobileExampleComponent'
        }
    ];
    multiInputReactive: ExampleFile[] = [
        {
            language: 'html',
            code: platformMultiInputReactiveExample,
            fileName: 'platform-multi-input-reactive-example'
        },
        {
            language: 'typescript',
            code: platformMultiInputReactiveExampleTs,
            fileName: 'platform-multi-input-reactive-example',
            component: 'PlatformMultiInputReactiveExampleComponent'
        }
    ];
}
