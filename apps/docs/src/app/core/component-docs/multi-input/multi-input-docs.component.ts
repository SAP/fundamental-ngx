import { Component } from '@angular/core';

import * as simpleH from '!raw-loader!./examples/multi-input-example/multi-input-example.component.html';
import * as simpleT from '!raw-loader!./examples/multi-input-example/multi-input-example.component.ts';

import * as displayH from '!raw-loader!./examples/multi-input-displaywith-example/multi-input-displaywith-example.component.html';
import * as displayT from '!raw-loader!./examples/multi-input-displaywith-example/multi-input-displaywith-example.component.ts';

import * as filterH from '!raw-loader!./examples/multi-input-filter-example/multi-input-filter-example.component.html';
import * as filterT from '!raw-loader!./examples/multi-input-filter-example/multi-input-filter-example.component.ts';

import * as includesH from '!raw-loader!./examples/multi-input-includes-example/multi-input-includes-example.component.html';
import * as includesT from '!raw-loader!./examples/multi-input-includes-example/multi-input-includes-example.component.ts';

import * as asyncH from '!raw-loader!./examples/multi-input-async-example/multi-input-async-example.component.html';
import * as asyncT from '!raw-loader!./examples/multi-input-async-example/multi-input-async-example.component.ts';

import * as compactH from '!raw-loader!./examples/multi-input-compact-example/multi-input-compact-example.component.html';
import * as compactT from '!raw-loader!./examples/multi-input-compact-example/multi-input-compact-example.component.ts';

import * as formH from '!raw-loader!./examples/multi-input-form-example/multi-input-form-example.component.html';
import * as formT from '!raw-loader!./examples/multi-input-form-example/multi-input-form-example.component.ts';

import * as newTokensH from '!raw-loader!./examples/multi-input-new-tokens-example/multi-input-new-tokens-example.component.html';
import * as newTokensT from '!raw-loader!./examples/multi-input-new-tokens-example/multi-input-new-tokens-example.component.ts';

import * as mobileH from '!raw-loader!./examples/multi-input-mobile-example/multi-input-mobile-example.component.html';
import * as mobileT from '!raw-loader!./examples/multi-input-mobile-example/multi-input-mobile-example.component.ts';

import * as customH from '!raw-loader!./examples/multi-input-custom-item-example/multi-input-custom-item-example.component.html';
import * as customT from '!raw-loader!./examples/multi-input-custom-item-example/multi-input-custom-item-example.component.ts';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-multi-input-docs',
    templateUrl: './multi-input-docs.component.html',
    styleUrls: ['./multi-input-docs.component.scss']
})
export class MultiInputDocsComponent {
    multiInputBasic: ExampleFile[] = [
        {
            language: 'html',
            code: simpleH,
            fileName: 'multi-input-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputExampleComponent',
            code: simpleT,
            fileName: 'multi-input-example'
        }
    ];

    display: ExampleFile[] = [
        {
            language: 'html',
            code: displayH,
            fileName: 'multi-input-displaywith-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputDisplaywithExampleComponent',
            code: displayT,
            fileName: 'multi-input-displaywith-example'
        }
    ];

    filter: ExampleFile[] = [
        {
            language: 'html',
            code: filterH,
            fileName: 'multi-input-filter-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputFilterExampleComponent',
            code: filterT,
            fileName: 'multi-input-filter-example'
        }
    ];

    includes: ExampleFile[] = [
        {
            language: 'html',
            code: includesH,
            fileName: 'multi-input-includes-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputIncludesExampleComponent',
            code: includesT,
            fileName: 'multi-input-includes-example'
        }
    ];

    async: ExampleFile[] = [
        {
            language: 'html',
            code: asyncH,
            fileName: 'multi-input-async-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputAsyncExampleComponent',
            code: asyncT,
            fileName: 'multi-input-async-example'
        }
    ];

    compact: ExampleFile[] = [
        {
            language: 'html',
            code: compactH,
            fileName: 'multi-input-compact-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputCompactExampleComponent',
            code: compactT,
            fileName: 'multi-input-compact-example'
        }
    ];

    form: ExampleFile[] = [
        {
            language: 'html',
            code: formH,
            fileName: 'multi-input-form-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputFormExampleComponent',
            code: formT,
            fileName: 'multi-input-form-example'
        }
    ];

    mobile: ExampleFile[] = [
        {
            language: 'html',
            code: mobileH,
            fileName: 'multi-input-mobile-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputMobileExampleComponent',
            code: mobileT,
            fileName: 'multi-input-mobile-example'
        }
    ];

    newTokens: ExampleFile[] = [
        {
            language: 'html',
            code: newTokensH,
            fileName: 'multi-input-new-tokens-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputNewTokensExampleComponent',
            code: newTokensT,
            fileName: 'multi-input-new-tokens-example'
        }
    ];

    customItem: ExampleFile[] = [
        {
            language: 'html',
            code: customH,
            fileName: 'multi-input-custom-item-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputCustomItemExampleComponent',
            code: customT,
            fileName: 'multi-input-custom-item-example'
        }
    ];
}
