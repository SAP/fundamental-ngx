import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { VariantManagementDefaultExampleComponent } from './examples/default/variant-management-default-example.component';
import { VariantManagementDynamicPageExampleComponent } from './examples/dynamic-page/variant-management-dynamic-page-example.component';
import { VariantManagementTableExampleComponent } from './examples/table/variant-management-table-example.component';

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
