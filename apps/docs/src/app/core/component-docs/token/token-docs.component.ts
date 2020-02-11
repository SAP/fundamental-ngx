import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as basicTokenH from '!raw-loader!./examples/token-example/token-example.component.html';
import * as basicTokenTs from '!raw-loader!./examples/token-example/token-example.component.ts';

import * as selectedTokenH from '!raw-loader!./examples/token-selected-example/token-selected-example.component.html';
import * as selectedTokenTs from '!raw-loader!./examples/token-selected-example/token-selected-example.component.ts';

import * as readOnlyTokenH from '!raw-loader!./examples/token-readonly-example/token-readonly-example.component.html';
import * as readOnlyTokenTs from '!raw-loader!./examples/token-readonly-example/token-readonly-example.component.ts';

import * as compactTokenH from '!raw-loader!./examples/token-compact-example/token-compact-example.component.html';
import * as compactTokenTs from '!raw-loader!./examples/token-compact-example/token-compact-example.component.ts';

import * as tokenizerH from '!raw-loader!./examples/tokenizer-example/tokenizer-example.component.html';
import * as tokenizerTsCode from '!raw-loader!./examples/tokenizer-example/tokenizer-example.component.ts';

import * as tokenizerCompactH from '!raw-loader!./examples/tokenizer-compact-example/tokenizer-compact-example.component.html';
import * as tokenizerCompactTsCode from '!raw-loader!./examples/tokenizer-compact-example/tokenizer-compact-example.component.ts';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-token-docs',
    templateUrl: './token-docs.component.html',
    styleUrls: ['./token-docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TokenDocsComponent implements OnInit {
    basicToken: ExampleFile[] = [
        {
            language: 'html',
            code: basicTokenH,
            fileName: 'token-example',
            component: 'TokenExampleComponent',
            typescriptFileCode: basicTokenTs
        }
    ];
    selectedToken: ExampleFile[] = [
        {
            language: 'html',
            code: selectedTokenH,
            fileName: 'token-selected-example',
            component: 'TokenSelectedExampleComponent',
            typescriptFileCode: selectedTokenTs
        }
    ];
    readOnlyToken: ExampleFile[] = [
        {
            language: 'html',
            code: readOnlyTokenH,
            fileName: 'token-readonly-example',
            component: 'TokenReadOnlyExampleComponent',
            typescriptFileCode: readOnlyTokenTs
        }
    ];
    compactToken: ExampleFile[] = [
        {
            language: 'html',
            code: compactTokenH,
            fileName: 'token-compact-example',
            component: 'TokenCompactExampleComponent',
            typescriptFileCode: compactTokenTs
        }
    ];
    tokenizer: ExampleFile[] = [
        {
            language: 'html',
            code: tokenizerH,
            fileName: 'tokenizer-example'
        },
        {
            language: 'typescript',
            component: 'TokenizerExampleComponent',
            code: tokenizerTsCode,
            fileName: 'tokenizer-example'
        }
    ];
    tokenizerCompact: ExampleFile[] = [
        {
            language: 'html',
            code: tokenizerCompactH,
            fileName: 'tokenizer-compact-example'
        },
        {
            language: 'typescript',
            component: 'TokenizerCompactExampleComponent',
            code: tokenizerCompactTsCode,
            fileName: 'tokenizer-compact-example'
        }
    ];

    ngOnInit() { }
}
