import { Component } from '@angular/core';
import { ExampleFile, getExampleFile } from '@fundamental-ngx/docs/shared';
import { VariantManagementDynamicPageExampleComponent } from './examples/dynamic-page/variant-management-dynamic-page-example.component';
import { VariantManagementTableExampleComponent } from './examples/table/variant-management-table-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { VariantManagementDefaultExampleComponent } from './examples/default/variant-management-default-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

@Component({
    selector: 'app-variant-management',
    templateUrl: './variant-management-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        VariantManagementDefaultExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        VariantManagementTableExampleComponent,
        VariantManagementDynamicPageExampleComponent
    ]
})
export class VariantManagementDocsComponent {
    variantManagementDefaultExample: ExampleFile[] = [
        getExampleFile('default/variant-management-default-example.component.html', {
            fileName: 'variant-management-default-example'
        }),
        getExampleFile('default/variant-management-default-example.component.ts', {
            fileName: 'variant-management-default-example',
            component: 'VariantManagementDefaultExampleComponent'
        })
    ];

    variantManagementTableExample: ExampleFile[] = [
        getExampleFile('table/variant-management-table-example.component.html', {
            fileName: 'variant-management-table-example'
        }),
        getExampleFile('table/variant-management-table-example.component.ts', {
            fileName: 'variant-management-table-example',
            component: 'VariantManagementTableExampleComponent'
        })
    ];

    variantManagementDynamicPageExample: ExampleFile[] = [
        getExampleFile('dynamic-page/variant-management-dynamic-page-example.component.html', {
            fileName: 'variant-management-dynamic-page-example.component'
        }),
        getExampleFile('dynamic-page/variant-management-dynamic-page-example.component.ts', {
            fileName: 'variant-management-dynamic-page-example.component',
            component: 'VariantManagementDynamicPageExampleComponent'
        })
    ];
}
