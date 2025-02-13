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
        getExampleFile('default/variant-management-default-example.component.html'),
        getExampleFile('default/variant-management-default-example.component.ts', {
            component: 'VariantManagementDefaultExampleComponent',
            selector: 'doc-variant-management-default-example'
        })
    ];

    variantManagementTableExample: ExampleFile[] = [
        getExampleFile('table/variant-management-table-example.component.html'),
        getExampleFile('table/variant-management-table-example.component.ts', {
            component: 'VariantManagementTableExampleComponent',
            selector: 'doc-variant-management-table-example'
        })
    ];

    variantManagementDynamicPageExample: ExampleFile[] = [
        getExampleFile('dynamic-page/variant-management-dynamic-page-example.component.html'),
        getExampleFile('dynamic-page/variant-management-dynamic-page-example.component.ts', {
            component: 'VariantManagementDynamicPageExampleComponent',
            selector: 'doc-variant-management-dynamic-page-example'
        })
    ];
}
