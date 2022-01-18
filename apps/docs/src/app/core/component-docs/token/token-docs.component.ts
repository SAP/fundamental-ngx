import { Component, ViewEncapsulation } from '@angular/core';

import basicTokenH from '!./examples/token-example/token-example.component.html?raw';
import basicTokenTs from '!./examples/token-example/token-example.component.ts?raw';

import selectedTokenH from '!./examples/token-selected-example/token-selected-example.component.html?raw';
import selectedTokenTs from '!./examples/token-selected-example/token-selected-example.component.ts?raw';

import readOnlyTokenH from '!./examples/token-readonly-example/token-readonly-example.component.html?raw';
import readOnlyTokenTs from '!./examples/token-readonly-example/token-readonly-example.component.ts?raw';

import compactTokenH from '!./examples/token-compact-example/token-compact-example.component.html?raw';
import compactTokenTs from '!./examples/token-compact-example/token-compact-example.component.ts?raw';

import tokenizerH from '!./examples/tokenizer-example/tokenizer-example.component.html?raw';
import tokenizerTsCode from '!./examples/tokenizer-example/tokenizer-example.component.ts?raw';

import tokenizerCompactH from '!./examples/tokenizer-compact-example/tokenizer-compact-example.component.html?raw';
import tokenizerCompactTsCode from '!./examples/tokenizer-compact-example/tokenizer-compact-example.component.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-token-docs',
    templateUrl: './token-docs.component.html',
    styleUrls: ['./token-docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TokenDocsComponent {
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
}
