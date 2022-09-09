import { Component, ViewEncapsulation } from '@angular/core';

const selectrc = 'select-example/select-example.component.html';
const selectSemanticrc = 'select-example/select-semantic-example.component.html';
const selectFormsrc = 'select-example/select-forms-example.component.html';
const selectEditablerc = 'select-example/select-editable-example.component.html';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-select',
    templateUrl: './select-docs.component.html',
    styleUrls: ['select-docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SelectDocsComponent {
    selectExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectrc),
            fileName: 'select-example'
        }
    ];
    selectSemanticExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectSemanticrc),
            fileName: 'select-semantic-example'
        }
    ];
    selectFormsExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectFormsrc),
            fileName: 'select-forms-example'
        }
    ];
    selectEditableExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectEditablerc),
            fileName: 'select-editable-example'
        }
    ];
}
