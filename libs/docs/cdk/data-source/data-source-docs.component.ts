import { Component } from '@angular/core';
import { DataSourceDirective } from '@fundamental-ngx/cdk/data-source';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { DataSourceDefaultExampleComponent } from './examples/default/data-source-default-example.component';

@Component({
    selector: 'app-data-source',
    templateUrl: './data-source-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        DataSourceDirective,
        DataSourceDefaultExampleComponent,
        CodeExampleComponent
    ]
})
export class DataSourceDocsComponent {
    dataSourceDefaultExample: ExampleFile[] = [
        getExampleFile('default/data-source-default-example.component.html'),
        getExampleFile('default/data-source-default-example.component.ts', {
            component: 'DataSourceDefaultExampleComponent',
            selector: 'data-source-default-example'
        })
    ];
}
