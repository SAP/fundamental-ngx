import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as basicTokenH from '!raw-loader!./examples/token-example/token-example.component.html';
import * as tokenTsCode from '!raw-loader!./examples/token-example/token-example.component.ts';

import * as selectedTokenH from '!raw-loader!./examples/token-selected-example/token-selected-example.component.html';
import * as selectedTokenTsCode from '!raw-loader!./examples/token-selected-example/token-selected-example.component.ts';

import * as readOnlyTokenH from '!raw-loader!./examples/token-readonly-example/token-readonly-example.component.html';
import * as readOnlyTokenTsCode from '!raw-loader!./examples/token-readonly-example/token-readonly-example.component.ts';

import * as compactTokenH from '!raw-loader!./examples/token-compact-example/token-compact-example.component.html';
import * as compactTokenTsCode from '!raw-loader!./examples/token-compact-example/token-compact-example.component.ts';

import * as tokenizerH from '!raw-loader!./examples/tokenizer-example/tokenizer-example.component.html';
import * as tokenizerTsCode from '!raw-loader!./examples/tokenizer-example/tokenizer-example.component.ts';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

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
            secondFile: 'token-example',
            typescriptFileCode: tokenTsCode,
            fileName: 'token-example',
            component: 'TokenExampleComponent'
        }
    ];
    selectedToken: ExampleFile[] = [
        {
            language: 'html',
            code: selectedTokenH,
            secondFile: 'token-selected-example',
            typescriptFileCode: selectedTokenTsCode,
            fileName: 'token-selected-example',
            component: 'TokenSelectedExampleComponent'
        }
    ];
    readOnlyToken: ExampleFile[] = [
        {
            language: 'html',
            code: readOnlyTokenH,
            secondFile: 'token-readonly-example',
            typescriptFileCode: readOnlyTokenTsCode,
            fileName: 'token-readonly-example',
            component: 'TokenReadOnlyExampleComponent'
        }
    ];
    compactToken: ExampleFile[] = [
        {
            language: 'html',
            code: compactTokenH,
            secondFile: 'token-compact-example',
            typescriptFileCode: compactTokenTsCode,
            fileName: 'token-compact-example',
            component: 'TokenCompactExampleComponent'
        }
    ];
    tokenizer: ExampleFile[] = [
        {
            language: 'html',
            code: tokenizerH,
            secondFile: 'tokenizer-example-example',
            typescriptFileCode: tokenizerTsCode,
            fileName: 'tokenizer-example-example',
            component: 'TokenizerExampleComponent'
        }
    ];

    ngOnInit() { }
}
