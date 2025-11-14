import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BarcodeScannerDialogExample } from './examples/barcode-scanner-dialog-sample';

const basicSampleHtml = 'barcode-scanner-dialog-sample.html';
const basicSampleTs = 'barcode-scanner-dialog-sample.ts';

@Component({
    selector: 'ui5-barcode-scanner-dialog-docs',
    templateUrl: './barcode-scanner-dialog-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        BarcodeScannerDialogExample
    ]
})
export class BarcodeScannerDialogDocs {
    private readonly exampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            fileName: 'barcode-scanner-dialog-example'
        },
        {
            language: 'typescript',
            component: 'BarcodeScannerDialogExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: 'barcode-scanner-dialog-example'
        }
    ]);

    readonly examples = computed(() => this.exampleFiles());
}
