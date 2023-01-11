import { Component } from '@angular/core';
import { ExampleFile, getExampleFile } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-initial-focus',
    templateUrl: './initial-focus-docs.component.html'
})
export class InitialFocusDocsComponent {
    initialFocusDefaultExample: ExampleFile[] = [
        getExampleFile('default/initial-focus-default-example.component.html'),
        getExampleFile('default/initial-focus-default-example.component.ts')
    ];

    initialFocusNestedElementExample: ExampleFile[] = [
        getExampleFile('nested-elements-example/nested-elements-example.component.html'),
        getExampleFile('nested-elements-example/nested-elements-example.component.ts')
    ];
}
