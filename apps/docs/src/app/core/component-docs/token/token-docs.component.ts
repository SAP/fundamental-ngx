import { Component, OnInit } from '@angular/core';

import * as basicTokenH from '!raw-loader!./examples/token-example/token-example.component.html';

import * as selectedTokenH from '!raw-loader!./examples/token-selected-example/token-selected-example.component.html';

import * as readOnlyTokenH from '!raw-loader!./examples/token-readonly-example/token-readonly-example.component.html';

import * as compactTokenH from '!raw-loader!./examples/token-compact-example/token-compact-example.component.html';

import * as tokenizerH from '!raw-loader!./examples/tokenizer-example/tokenizer-example.component.html';
import * as tokenizerTsCode from '!raw-loader!./examples/tokenizer-example/tokenizer-example.component.ts';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-token-docs',
    templateUrl: './token-docs.component.html',
    styleUrls: ['./token-docs.component.scss']
})
export class TokenDocsComponent implements OnInit {
    basicToken: ExampleFile[] = [
        {
            language: 'html',
            code: basicTokenH,
            fileName: 'token-example',
            component: 'TokenExampleComponent'
        }
    ];
    selectedToken: ExampleFile[] = [
        {
            language: 'html',
            code: selectedTokenH,
            fileName: 'token-selected-example',
            component: 'TokenSelectedExampleComponent'
        }
    ];
    readOnlyToken: ExampleFile[] = [
        {
            language: 'html',
            code: readOnlyTokenH,
            fileName: 'token-readonly-example',
            component: 'TokenReadOnlyExampleComponent'
        }
    ];
    compactToken: ExampleFile[] = [
        {
            language: 'html',
            code: compactTokenH,
            fileName: 'token-compact-example',
            component: 'TokenCompactExampleComponent'
        }
    ];
    tokenizer: ExampleFile[] = [
        {
            language: 'html',
            code: tokenizerH,
            fileName: 'tokenizer-example-example',
            component: 'TokenizerExampleComponent'
        },
        {
            language: 'typescript',
            component: 'TokenizerExampleComponent',
            code: tokenizerTsCode,
            fileName: 'tokenizer-example'
        }
    ];

    ngOnInit() { }
}
