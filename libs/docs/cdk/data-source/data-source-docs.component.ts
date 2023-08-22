import { Component } from '@angular/core';
import { ExampleFile, getExampleFile } from '@fundamental-ngx/docs/shared';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { DataSourceDefaultExampleComponent } from './examples/default/data-source-default-example.component';
import { DataSourceDirective } from '@fundamental-ngx/cdk/data-source';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

@Component({
    selector: 'app-data-source',
    templateUrl: './data-source-docs.component.html',
    standalone: true,
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
        getExampleFile('default/data-source-default-example.component.ts')
    ];
}
