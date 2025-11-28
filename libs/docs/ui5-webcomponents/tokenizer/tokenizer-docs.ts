import { Component, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { TokenizerBasicSample } from './examples/basic-sample';
import { TokenizerClearAllSample } from './examples/clear-all';
import { TokenizerMultiLineSample } from './examples/multi-line';
import { TokenizerReadonlySample } from './examples/readonly';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const multiLineHtml = 'multi-line.html';
const multiLineTs = 'multi-line.ts';
const readonlyHtml = 'readonly.html';
const readonlyTs = 'readonly.ts';
const clearAllHtml = 'clear-all.html';
const clearAllTs = 'clear-all.ts';

@Component({
    selector: 'ui5-tokenizer-docs',
    templateUrl: './tokenizer-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        TokenizerBasicSample,
        TokenizerMultiLineSample,
        TokenizerReadonlySample,
        TokenizerClearAllSample
    ]
})
export class TokenizerDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'TokenizerBasicSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample'
        }
    ]);

    private readonly multiLineExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(multiLineHtml),
            originalFileName: 'multi-line'
        },
        {
            language: 'typescript',
            component: 'TokenizerMultiLineSample',
            code: getAssetFromModuleAssets(multiLineTs),
            originalFileName: 'multi-line'
        }
    ]);

    private readonly readonlyExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(readonlyHtml),
            originalFileName: 'readonly'
        },
        {
            language: 'typescript',
            component: 'TokenizerReadonlySample',
            code: getAssetFromModuleAssets(readonlyTs),
            originalFileName: 'readonly'
        }
    ]);

    private readonly clearAllExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(clearAllHtml),
            originalFileName: 'clear-all'
        },
        {
            language: 'typescript',
            component: 'TokenizerClearAllSample',
            code: getAssetFromModuleAssets(clearAllTs),
            originalFileName: 'clear-all'
        }
    ]);

    // Computed properties for code examples
    basicFiles = this.basicExampleFiles.asReadonly();
    multiLineFiles = this.multiLineExampleFiles.asReadonly();
    readonlyFiles = this.readonlyExampleFiles.asReadonly();
    clearAllFiles = this.clearAllExampleFiles.asReadonly();
}
