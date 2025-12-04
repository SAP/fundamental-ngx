import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BasicSample } from './examples/basic-sample';
import { CustomButtonSample } from './examples/custom-button-sample';
import { FileSizeRestrictionsSample } from './examples/file-size-restrictions-sample';
import { MultipleFilesSample } from './examples/multiple-files-sample';
import { FileTypeRestrictionsSample } from './examples/type-restrictions-sample';
import { ValueStateSample } from './examples/value-state-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const multipleFilesSampleTs = 'multiple-files-sample.ts';
const multipleFilesSampleHtml = 'multiple-files-sample.html';
const typeRestrictionsSampleTs = 'type-restrictions-sample.ts';
const typeRestrictionsSampleHtml = 'type-restrictions-sample.html';
const fileSizeRestrictionsSampleTs = 'file-size-restrictions-sample.ts';
const fileSizeRestrictionsSampleHtml = 'file-size-restrictions-sample.html';
const valueStateSampleTs = 'value-state-sample.ts';
const valueStateSampleHtml = 'value-state-sample.html';
const customButtonSampleTs = 'custom-button-sample.ts';
const customButtonSampleHtml = 'custom-button-sample.html';

@Component({
    selector: 'ui5-doc-file-uploader',
    templateUrl: './file-uploader-docs.html',
    standalone: true,
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        BasicSample,
        MultipleFilesSample,
        FileTypeRestrictionsSample,
        FileSizeRestrictionsSample,
        ValueStateSample,
        CustomButtonSample
    ]
})
export class FileUploaderDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample',
            component: 'BasicSample',
            typescriptFileCode: getAssetFromModuleAssets(basicSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        }
    ]);

    private readonly multipleFilesExampleFiles = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(multipleFilesSampleTs),
            originalFileName: 'multiple-files-sample',
            component: 'MultipleFilesSample',
            typescriptFileCode: getAssetFromModuleAssets(multipleFilesSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(multipleFilesSampleHtml),
            originalFileName: 'multiple-files-sample'
        }
    ]);

    private readonly typeRestrictionsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(typeRestrictionsSampleTs),
            originalFileName: 'type-restrictions-sample',
            component: 'TypeRestrictionsSample',
            typescriptFileCode: getAssetFromModuleAssets(typeRestrictionsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(typeRestrictionsSampleHtml),
            originalFileName: 'type-restrictions-sample'
        }
    ]);

    private readonly fileSizeRestrictionsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(fileSizeRestrictionsSampleTs),
            originalFileName: 'file-size-restrictions-sample',
            component: 'FileSizeRestrictionsSample',
            typescriptFileCode: getAssetFromModuleAssets(fileSizeRestrictionsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(fileSizeRestrictionsSampleHtml),
            originalFileName: 'file-size-restrictions-sample'
        }
    ]);

    private readonly valueStateExampleFiles = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(valueStateSampleTs),
            originalFileName: 'value-state-sample',
            component: 'ValueStateSample',
            typescriptFileCode: getAssetFromModuleAssets(valueStateSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(valueStateSampleHtml),
            originalFileName: 'value-state-sample'
        }
    ]);

    private readonly customButtonExampleFiles = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(customButtonSampleTs),
            originalFileName: 'custom-button-sample',
            component: 'CustomButtonSample',
            typescriptFileCode: getAssetFromModuleAssets(customButtonSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(customButtonSampleHtml),
            originalFileName: 'custom-button-sample'
        }
    ]);

    readonly basicExample = computed(() => this.basicExampleFiles());
    readonly multipleFilesExample = computed(() => this.multipleFilesExampleFiles());
    readonly typeRestrictionsExample = computed(() => this.typeRestrictionsExampleFiles());
    readonly fileSizeRestrictionsExample = computed(() => this.fileSizeRestrictionsExampleFiles());
    readonly valueStateExample = computed(() => this.valueStateExampleFiles());
    readonly customButtonExample = computed(() => this.customButtonExampleFiles());
}
