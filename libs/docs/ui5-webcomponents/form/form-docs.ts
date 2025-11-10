import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { FormBasicSample } from './examples/basic-sample';
import { FormColumnSpanSample } from './examples/column-span';
import { FormCustomHeaderSample } from './examples/custom-header';
import { FormEditSample } from './examples/edit';
import { FormEmptySpanSample } from './examples/empty-span';
import { FormHeaderTextWrappingSample } from './examples/header-text-wrapping';
import { FormLabelSpanSample } from './examples/label-span';
import { FormLabelsOnTopSample } from './examples/labels-on-top';
import { FormLayoutsSample } from './examples/layouts';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const layoutsHtml = 'layouts.html';
const layoutsTs = 'layouts.ts';
const labelSpanHtml = 'label-span.html';
const labelSpanTs = 'label-span.ts';
const emptySpanHtml = 'empty-span.html';
const emptySpanTs = 'empty-span.ts';
const labelsOnTopHtml = 'labels-on-top.html';
const labelsOnTopTs = 'labels-on-top.ts';
const editHtml = 'edit.html';
const editTs = 'edit.ts';
const columnSpanHtml = 'column-span.html';
const columnSpanTs = 'column-span.ts';
const headerTextWrappingHtml = 'header-text-wrapping.html';
const headerTextWrappingTs = 'header-text-wrapping.ts';
const customHeaderHtml = 'custom-header.html';
const customHeaderTs = 'custom-header.ts';

@Component({
    selector: 'ui5-form-docs',
    templateUrl: './form-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        FormBasicSample,
        FormLayoutsSample,
        FormLabelSpanSample,
        FormEmptySpanSample,
        FormLabelsOnTopSample,
        FormEditSample,
        FormColumnSpanSample,
        FormHeaderTextWrappingSample,
        FormCustomHeaderSample
    ]
})
export class FormDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            fileName: 'form-basic'
        },
        {
            language: 'typescript',
            component: 'FormBasicSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: 'form-basic'
        }
    ]);

    private readonly layoutsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(layoutsHtml),
            fileName: 'form-layouts'
        },
        {
            language: 'typescript',
            component: 'FormLayoutsSample',
            code: getAssetFromModuleAssets(layoutsTs),
            fileName: 'form-layouts'
        }
    ]);

    private readonly labelSpanExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(labelSpanHtml),
            fileName: 'label-span'
        },
        {
            language: 'typescript',
            component: 'FormLabelSpanSample',
            code: getAssetFromModuleAssets(labelSpanTs),
            fileName: 'label-span'
        }
    ]);

    private readonly emptySpanExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(emptySpanHtml),
            fileName: 'empty-span'
        },
        {
            language: 'typescript',
            component: 'FormEmptySpanSample',
            code: getAssetFromModuleAssets(emptySpanTs),
            fileName: 'empty-span'
        }
    ]);

    private readonly labelsOnTopExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(labelsOnTopHtml),
            fileName: 'labels-on-top'
        },
        {
            language: 'typescript',
            component: 'FormLabelsOnTopSample',
            code: getAssetFromModuleAssets(labelsOnTopTs),
            fileName: 'labels-on-top'
        }
    ]);

    private readonly editExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(editHtml),
            fileName: 'edit'
        },
        {
            language: 'typescript',
            component: 'FormEditSample',
            code: getAssetFromModuleAssets(editTs),
            fileName: 'edit'
        }
    ]);

    private readonly columnSpanExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(columnSpanHtml),
            fileName: 'form-column-span'
        },
        {
            language: 'typescript',
            component: 'FormColumnSpanSample',
            code: getAssetFromModuleAssets(columnSpanTs),
            fileName: 'form-column-span'
        }
    ]);

    private readonly headerTextWrappingExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(headerTextWrappingHtml),
            fileName: 'header-text-wrapping'
        },
        {
            language: 'typescript',
            component: 'FormHeaderTextWrappingSample',
            code: getAssetFromModuleAssets(headerTextWrappingTs),
            fileName: 'header-text-wrapping'
        }
    ]);

    private readonly customHeaderExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(customHeaderHtml),
            fileName: 'custom-header'
        },
        {
            language: 'typescript',
            component: 'FormCustomHeaderSample',
            code: getAssetFromModuleAssets(customHeaderTs),
            fileName: 'custom-header'
        }
    ]);

    readonly basicExamples = computed(() => this.basicExampleFiles());
    readonly layoutsExamples = computed(() => this.layoutsExampleFiles());
    readonly labelSpanExamples = computed(() => this.labelSpanExampleFiles());
    readonly emptySpanExamples = computed(() => this.emptySpanExampleFiles());
    readonly labelsOnTopExamples = computed(() => this.labelsOnTopExampleFiles());
    readonly editExamples = computed(() => this.editExampleFiles());
    readonly columnSpanExamples = computed(() => this.columnSpanExampleFiles());
    readonly headerTextWrappingExamples = computed(() => this.headerTextWrappingExampleFiles());
    readonly customHeaderExamples = computed(() => this.customHeaderExampleFiles());
}
