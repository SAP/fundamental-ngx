import { Component } from '@angular/core';

import * as simpleH from '!raw-loader!./examples/multi-input-example/multi-input-example.component.html';
import * as simpleT from '!raw-loader!./examples/multi-input-example/multi-input-example.component.ts';

import * as displayH from '!raw-loader!./examples/multi-input-displaywith-example/multi-input-displaywith-example.component.html';
import * as displayT from '!raw-loader!./examples/multi-input-displaywith-example/multi-input-displaywith-example.component.ts';

import * as filterH from '!raw-loader!./examples/multi-input-filter-example/multi-input-filter-example.component.html';
import * as filterT from '!raw-loader!./examples/multi-input-filter-example/multi-input-filter-example.component.ts';

import * as asyncH from '!raw-loader!./examples/multi-input-async-example/multi-input-async-example.component.html';
import * as asyncT from '!raw-loader!./examples/multi-input-async-example/multi-input-async-example.component.ts';

import * as formH from '!raw-loader!./examples/multi-input-form-example/multi-input-form-example.component.html';
import * as formT from '!raw-loader!./examples/multi-input-form-example/multi-input-form-example.component.ts';
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
}
