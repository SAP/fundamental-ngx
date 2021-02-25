import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as viewManagementHtml from '!raw-loader!./examples/variant-management-example/variant-management-example.component.html';
import * as viewManagementHeaderSizeHtml from '!raw-loader!./examples/variant-management-header-size-example/variant-management-header-size-example.component.html';
import * as viewManagementCustomLabelHtml from '!raw-loader!./examples/variant-management-custom-label-example/variant-management-custom-label-example.component.html';

@Component({
    selector: 'app-poster',
    templateUrl: './variant-management-docs.component.html'
})
export class VariantManagementDocsComponent {
    viewManagementExample: ExampleFile[] = [
        {
            language: 'html',
            code: viewManagementHtml,
            fileName: 'variant-management-example'
        }
    ];

    viewManagementHeaderSizeExample: ExampleFile[] = [
        {
            language: 'html',
            code: viewManagementHeaderSizeHtml,
            fileName: 'variant-management-header-size-example'
        }
    ];

    viewManagementCustomLabelExample: ExampleFile[] = [
        {
            language: 'html',
            code: viewManagementCustomLabelHtml,
            fileName: 'variant-management-custom-label-example'
        }
    ];

}
