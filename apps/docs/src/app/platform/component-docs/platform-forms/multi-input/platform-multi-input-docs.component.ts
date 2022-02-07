import { Component } from '@angular/core';

import platformMultiInputSimpleExample from '!./platform-multi-input-example/platform-multi-input-example.component.html?raw';
import platformMultiInputSimpmleExampleTs from '!./platform-multi-input-example/platform-multi-input-example.component.ts?raw';
import platformMultiInputComplexExample from '!./platform-multi-input-example/platform-multi-input-complex-example.component.html?raw';
import platformMultiInputComplexExampleTs from '!./platform-multi-input-example/platform-multi-input-complex-example.component.ts?raw';
import platformMultiInputGroupedExample from '!./platform-multi-input-example/platform-multi-input-grouped-example.component.html?raw';
import platformMultiInputGroupedExampleTs from '!./platform-multi-input-example/platform-multi-input-grouped-example.component.ts?raw';
import platformMultiInputDeclineExample from '!./platform-multi-input-example/platform-multi-input-decline-example.component.html?raw';
import platformMultiInputDeclineExampleTs from '!./platform-multi-input-example/platform-multi-input-decline-example.component.ts?raw';
import platformMultiInputDisableExample from '!./platform-multi-input-example/platform-multi-input-disabled.component.html?raw';
import platformMultiInputDisableExampleTs from '!./platform-multi-input-example/platform-multi-input-disabled.component.ts?raw';
import platformMultiInputMobileExample from '!./platform-multi-input-example/platform-multi-input-mobile-example.component.html?raw';
import platformMultiInputMobileExampleTs from '!./platform-multi-input-example/platform-multi-input-mobile-example.component.ts?raw';
import platformMultiInputReactiveExample from '!./platform-multi-input-example/platform-multi-input-reactive-example.component.html?raw';
import platformMultiInputReactiveExampleTs from '!./platform-multi-input-example/platform-multi-input-reactive-example.component.ts?raw';
import PlatformMultiInputCompactExampleComponent from '!./platform-multi-input-example/platform-multi-input-compact-example.component.html?raw';
import PlatformMultiInputCompactExampleComponentTs from '!./platform-multi-input-example/platform-multi-input-compact-example.component.ts?raw';
import PlatformMultiInputLoadingExampleComponent from '!./platform-multi-input-example/platform-multi-input-loading-example.component.html?raw';
import PlatformMultiInputLoadingExampleComponentTs from '!./platform-multi-input-example/platform-multi-input-loading-example.component.ts?raw';

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
    multiInputLoading: ExampleFile[] = [
        {
            language: 'html',
            code: PlatformMultiInputLoadingExampleComponent,
            fileName: 'platform-multi-input-loading-example'
        },
        {
            language: 'typescript',
            code: PlatformMultiInputLoadingExampleComponentTs,
            fileName: 'platform-multi-input-loading-example',
            component: 'PlatformMultiInputLoadingExampleComponent'
        }
    ];
}
