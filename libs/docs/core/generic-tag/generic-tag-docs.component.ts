import { Component } from '@angular/core';

import { ExampleFile, getExampleFile } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-generic-tag',
    templateUrl: './generic-tag-docs.component.html'
})
export class GenericTagDocsComponent {
    genericTagDefault: ExampleFile[] = [
        getExampleFile('generic-tag-default-example.component.html'),
        getExampleFile('generic-tag-default-example.component.ts', { component: 'GenericTagDefaultExampleComponent' })
    ];
}
