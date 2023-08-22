import { Component, ViewEncapsulation } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { TokenizerCompactExampleComponent } from './examples/tokenizer-compact-example/tokenizer-compact-example.component';
import { TokenizerExampleComponent } from './examples/tokenizer-example/tokenizer-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { TokenCompactExampleComponent } from './examples/token-compact-example/token-compact-example.component';
import { TokenReadOnlyExampleComponent } from './examples/token-readonly-example/token-readonly-example.component';
import { TokenSelectedExampleComponent } from './examples/token-selected-example/token-selected-example.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { TokenExampleComponent } from './examples/token-example/token-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

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
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        TokenExampleComponent,
        CodeExampleComponent,
        TokenSelectedExampleComponent,
        TokenReadOnlyExampleComponent,
        TokenCompactExampleComponent,
        DescriptionComponent,
        TokenizerExampleComponent,
        TokenizerCompactExampleComponent
    ]
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
