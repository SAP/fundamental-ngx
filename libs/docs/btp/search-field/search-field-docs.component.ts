import { Component } from '@angular/core';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { TableModule } from '@fundamental-ngx/core/table';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { SearchFieldBasicExampleComponent } from './examples/basic-example/search-field-basic-example.component';

@Component({
    templateUrl: './search-field-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        FocusableGridDirective,
        TableModule,
        ComponentExampleComponent,
        CodeExampleComponent,
        SearchFieldBasicExampleComponent
    ]
})
export class SearchFieldDocsComponent {
    basicExample: ExampleFile[] = [
        getExampleFile('basic-example/search-field-basic-example.component.ts', {
            component: 'SearchFieldBasicExampleComponent',
            selector: 'search-field-basic-example'
        }),
        getExampleFile('basic-example/search-field-basic-example.component.html')
    ];
}
