import { Component } from '@angular/core';

import * as platformMultiInputSimpleExample from '!raw-loader!./platform-mulit-input-example/platform-mulit-input-example.component.html';
import * as platformMultiInputSimpmleExampleTs from '!raw-loader!./platform-mulit-input-example/platform-mulit-input-example.component.ts';
import * as platformMultiInputComplexExample from '!raw-loader!./platform-mulit-input-example/platform-mulit-input-complex-example.component.html';
import * as platformMultiInputComplexExampleTs from '!raw-loader!./platform-mulit-input-example/platform-mulit-input-complex-example.component.ts';
import * as platformMultiInputGroupedExample from '!raw-loader!./platform-mulit-input-example/platform-mulit-input-grouped-example.component.html';
import * as platformMultiInputGroupedExampleTs from '!raw-loader!./platform-mulit-input-example/platform-mulit-input-grouped-example.component.ts';
import * as platformMultiInputDeclineExample from '!raw-loader!./platform-mulit-input-example/platform-mulit-input-decline-example.component.html';
import * as platformMultiInputDeclineExampleTs from '!raw-loader!./platform-mulit-input-example/platform-mulit-input-decline-example.component.ts';
import * as platformMultiInputDisableExample from '!raw-loader!./platform-mulit-input-example/platform-mulit-input-disabled.component.html';
import * as platformMultiInputDisableExampleTs from '!raw-loader!./platform-mulit-input-example/platform-mulit-input-disabled.component.ts';
import * as platformMultiInputMobileExample from '!raw-loader!./platform-mulit-input-example/platform-mulit-input-mobile-example.component.html';
import * as platformMultiInputMobileExampleTs from '!raw-loader!./platform-mulit-input-example/platform-mulit-input-mobile-example.component.ts';
import * as platformMultiInputReactiveExample from '!raw-loader!./platform-mulit-input-example/platform-mulit-input-reactive-example.component.html';
import * as platformMultiInputReactiveExampleTs from '!raw-loader!./platform-mulit-input-example/platform-mulit-input-reactive-example.component.ts';

import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'fd-platform-multi-input-docs',
    templateUrl: './platform-multi-input-docs.component.html'
})
export class PlatformMultiInputDocsComponent {
    mulitiInputSimple: ExampleFile[] = [
        {
            language: 'html',
            code: platformMultiInputSimpleExample,
            fileName: 'platform-mulit-input-example'
        },
        {
            language: 'typescript',
            code: platformMultiInputSimpmleExampleTs,
            fileName: 'platform-mulit-input-example',
            component: 'PlatformMultiInputExample'
        }
    ];

    mulitiInputGrouped: ExampleFile[] = [
        {
            language: 'html',
            code: platformMultiInputComplexExample,
            fileName: 'platform-mulit-input-complex-example'
        },
        {
            language: 'typescript',
            code: platformMultiInputComplexExampleTs,
            fileName: 'platform-mulit-input-complex-example',
            component: 'platformMultiInputComplexExample'
        }
    ];
    mulitiInputValueHelp: ExampleFile[] = [
        {
            language: 'html',
            code: platformMultiInputGroupedExample,
            fileName: 'platform-mulit-input-grouped-example'
        },
        {
            language: 'typescript',
            code: platformMultiInputGroupedExampleTs,
            fileName: 'platform-mulit-input-grouped-example',
            component: 'platformMultiInputGroupedExample'
        }
    ];
    mulitiInputDecline: ExampleFile[] = [
        {
            language: 'html',
            code: platformMultiInputDeclineExample,
            fileName: 'platform-mulit-input-decline-example'
        },
        {
            language: 'typescript',
            code: platformMultiInputDeclineExampleTs,
            fileName: 'platform-mulit-input-decline-example',
            component: 'platformMultiInputDeclineExample'
        }
    ];
    mulitiInputDisable: ExampleFile[] = [
        {
            language: 'html',
            code: platformMultiInputDisableExample,
            fileName: 'platform-mulit-input-disabled'
        },
        {
            language: 'typescript',
            code: platformMultiInputDisableExampleTs,
            fileName: 'platform-mulit-input-disabled',
            component: 'platformMultiInputDisabledExample'
        }
    ];
    mulitiInputMobile: ExampleFile[] = [
        {
            language: 'html',
            code: platformMultiInputMobileExample,
            fileName: 'platform-mulit-input-mobile-example'
        },
        {
            language: 'typescript',
            code: platformMultiInputMobileExampleTs,
            fileName: 'platform-mulit-input-mobile-example',
            component: 'platformMultiInputMobileExample'
        }
    ];
    mulitiInputReactive: ExampleFile[] = [
        {
            language: 'html',
            code: platformMultiInputReactiveExample,
            fileName: 'platform-mulit-input-reactive-example'
        },
        {
            language: 'typescript',
            code: platformMultiInputReactiveExampleTs,
            fileName: 'platform-mulit-input-reactive-example',
            component: 'platformMultiInputMobileExample'
        }
    ];
}
