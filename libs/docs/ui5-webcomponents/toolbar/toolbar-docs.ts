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
            fileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'ToolbarBasicSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: 'basic-sample'
        }
    ]);

    private readonly designExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(designHtml),
            fileName: 'design'
        },
        {
            language: 'typescript',
            component: 'ToolbarDesignSample',
            code: getAssetFromModuleAssets(designTs),
            fileName: 'design'
        }
    ]);

    private readonly alignmentExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(alignmentHtml),
            fileName: 'alignment'
        },
        {
            language: 'typescript',
            component: 'ToolbarAlignmentSample',
            code: getAssetFromModuleAssets(alignmentTs),
            fileName: 'alignment'
        }
    ]);

    private readonly overflowExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(overflowHtml),
            fileName: 'overflow'
        },
        {
            language: 'typescript',
            component: 'ToolbarOverflowSample',
            code: getAssetFromModuleAssets(overflowTs),
            fileName: 'overflow'
        }
    ]);

    private readonly complexExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(complexHtml),
            fileName: 'complex'
        },
        {
            language: 'typescript',
            component: 'ToolbarComplexSample',
            code: getAssetFromModuleAssets(complexTs),
            fileName: 'complex'
        }
    ]);

    readonly basicExamples = this.basicExampleFiles.asReadonly();
    readonly designExamples = this.designExampleFiles.asReadonly();
    readonly alignmentExamples = this.alignmentExampleFiles.asReadonly();
    readonly overflowExamples = this.overflowExampleFiles.asReadonly();
    readonly complexExamples = this.complexExampleFiles.asReadonly();
}
