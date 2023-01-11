import { Component } from '@angular/core';
import { ExampleFile, getExampleFile } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-data-source',
    templateUrl: './data-source-docs.component.html'
})
export class DataSourceDocsComponent {
    dataSourceDefaultExample: ExampleFile[] = [
        getExampleFile('default/data-source-default-example.component.html'),
        getExampleFile('default/data-source-default-example.component.ts')
    ];
}
