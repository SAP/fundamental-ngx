import { Component, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { ToolbarAlignmentSample } from './examples/alignment';
import { ToolbarBasicSample } from './examples/basic-sample';
import { ToolbarComplexSample } from './examples/complex';
import { ToolbarDesignSample } from './examples/design';
import { ToolbarOverflowSample } from './examples/overflow';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const designHtml = 'design.html';
const designTs = 'design.ts';
const alignmentHtml = 'alignment.html';
const alignmentTs = 'alignment.ts';
const overflowHtml = 'overflow.html';
const overflowTs = 'overflow.ts';
const complexHtml = 'complex.html';
const complexTs = 'complex.ts';

@Component({
    selector: 'ui5-toolbar-docs',
    templateUrl: './toolbar-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        ToolbarBasicSample,
        ToolbarDesignSample,
        ToolbarAlignmentSample,
        ToolbarOverflowSample,
        ToolbarComplexSample
    ]
})
export class ToolbarDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'ToolbarBasicSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample'
        }
    ]);

    private readonly designExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(designHtml),
            originalFileName: 'design'
        },
        {
            language: 'typescript',
            component: 'ToolbarDesignSample',
            code: getAssetFromModuleAssets(designTs),
            originalFileName: 'design'
        }
    ]);

    private readonly alignmentExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(alignmentHtml),
            originalFileName: 'alignment'
        },
        {
            language: 'typescript',
            component: 'ToolbarAlignmentSample',
            code: getAssetFromModuleAssets(alignmentTs),
            originalFileName: 'alignment'
        }
    ]);

    private readonly overflowExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(overflowHtml),
            originalFileName: 'overflow'
        },
        {
            language: 'typescript',
            component: 'ToolbarOverflowSample',
            code: getAssetFromModuleAssets(overflowTs),
            originalFileName: 'overflow'
        }
    ]);

    private readonly complexExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(complexHtml),
            originalFileName: 'complex'
        },
        {
            language: 'typescript',
            component: 'ToolbarComplexSample',
            code: getAssetFromModuleAssets(complexTs),
            originalFileName: 'complex'
        }
    ]);

    readonly basicExamples = this.basicExampleFiles.asReadonly();
    readonly designExamples = this.designExampleFiles.asReadonly();
    readonly alignmentExamples = this.alignmentExampleFiles.asReadonly();
    readonly overflowExamples = this.overflowExampleFiles.asReadonly();
    readonly complexExamples = this.complexExampleFiles.asReadonly();
}
