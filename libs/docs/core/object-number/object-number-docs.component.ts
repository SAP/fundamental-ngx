import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const basicHtml = 'object-number-basic-example.component.html';
const boldHtml = 'object-number-bold-example.component.html';
const largeHtml = 'object-number-large-example.component.html';
const unitsHtml = 'object-number-units-example.component.html';
const statusHtml = 'object-number-status-example.component.html';
const decimalHtml = 'object-number-decimal-example.component.html';
const truncationHtml = 'object-number-truncation-example.component.html';

@Component({
    selector: 'app-object-number',
    templateUrl: './object-number-docs.component.html'
})
export class ObjectNumberDocsComponent {
    basic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicHtml),
            fileName: 'core-object-number-basic-example'
        }
    ];

    bold: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(boldHtml),
            fileName: 'core-object-number-bold-example'
        }
    ];

    large: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(largeHtml),
            fileName: 'core-object-number-large-example'
        }
    ];

    units: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(unitsHtml),
            fileName: 'core-object-number-units-example'
        }
    ];

    status: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(statusHtml),
            fileName: 'core-object-number-status-example'
        }
    ];

    decimal: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(decimalHtml),
            fileName: 'core-object-number-decimal-example'
        }
    ];
    truncation: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(truncationHtml),
            fileName: 'core-object-number-truncation-example'
        }
    ];
}
