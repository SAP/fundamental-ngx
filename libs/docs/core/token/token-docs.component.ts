import { Component, ViewEncapsulation } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const basicTokenH = 'token-example/token-example.component.html';
const basicTokenTs = 'token-example/token-example.component.ts';

const selectedTokenH = 'token-selected-example/token-selected-example.component.html';
const selectedTokenTs = 'token-selected-example/token-selected-example.component.ts';

const readOnlyTokenH = 'token-readonly-example/token-readonly-example.component.html';
const readOnlyTokenTs = 'token-readonly-example/token-readonly-example.component.ts';

const compactTokenH = 'token-compact-example/token-compact-example.component.html';
const compactTokenTs = 'token-compact-example/token-compact-example.component.ts';

const tokenizerH = 'tokenizer-example/tokenizer-example.component.html';
const tokenizerTsCode = 'tokenizer-example/tokenizer-example.component.ts';

const tokenizerCompactH = 'tokenizer-compact-example/tokenizer-compact-example.component.html';
const tokenizerCompactTsCode = 'tokenizer-compact-example/tokenizer-compact-example.component.ts';

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
            code: getAssetFromModuleAssets(basicTokenH),
            fileName: 'token-example',
            component: 'TokenExampleComponent',
            typescriptFileCode: getAssetFromModuleAssets(basicTokenTs)
        }
    ];
    selectedToken: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectedTokenH),
            fileName: 'token-selected-example',
            component: 'TokenSelectedExampleComponent',
            typescriptFileCode: getAssetFromModuleAssets(selectedTokenTs)
        }
    ];
    readOnlyToken: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(readOnlyTokenH),
            fileName: 'token-readonly-example',
            component: 'TokenReadOnlyExampleComponent',
            typescriptFileCode: getAssetFromModuleAssets(readOnlyTokenTs)
        }
    ];
    compactToken: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(compactTokenH),
            fileName: 'token-compact-example',
            component: 'TokenCompactExampleComponent',
            typescriptFileCode: getAssetFromModuleAssets(compactTokenTs)
        }
    ];
    tokenizer: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tokenizerH),
            fileName: 'tokenizer-example'
        },
        {
            language: 'typescript',
            component: 'TokenizerExampleComponent',
            code: getAssetFromModuleAssets(tokenizerTsCode),
            fileName: 'tokenizer-example'
        }
    ];
    tokenizerCompact: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tokenizerCompactH),
            fileName: 'tokenizer-compact-example'
        },
        {
            language: 'typescript',
            component: 'TokenizerCompactExampleComponent',
            code: getAssetFromModuleAssets(tokenizerCompactTsCode),
            fileName: 'tokenizer-compact-example'
        }
    ];
}
