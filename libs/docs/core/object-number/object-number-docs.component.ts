import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import {
    ObjectNumberBasicExampleComponent,
    ObjectNumberStatusExampleComponent,
    ObjectNumberLargeExampleComponent,
    ObjectNumberBoldExampleComponent,
    ObjectNumberUnitsExampleComponent,
    ObjectNumberDecimalExampleComponent,
    ObjectNumberTruncationExampleComponent
} from './examples/object-number-examples.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const basicHtml = 'object-number-basic-example.component.html';
const boldHtml = 'object-number-bold-example.component.html';
const largeHtml = 'object-number-large-example.component.html';
const unitsHtml = 'object-number-units-example.component.html';
const statusHtml = 'object-number-status-example.component.html';
const decimalHtml = 'object-number-decimal-example.component.html';
const truncationHtml = 'object-number-truncation-example.component.html';

@Component({
    selector: 'app-object-number',
    templateUrl: './object-number-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        ObjectNumberBasicExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        DescriptionComponent,
        ObjectNumberStatusExampleComponent,
        ObjectNumberLargeExampleComponent,
        ObjectNumberBoldExampleComponent,
        ObjectNumberUnitsExampleComponent,
        ObjectNumberDecimalExampleComponent,
        ObjectNumberTruncationExampleComponent
    ]
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
