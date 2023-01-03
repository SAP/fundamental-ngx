import { Component } from '@angular/core';
import { ExampleFile, getExampleFile } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-utils',
    templateUrl: './utils-docs.component.html'
})
export class UtilsDocsComponent {
    utilsDefaultExample: ExampleFile[] = [
        getExampleFile('default/utils-default-example.component.html'),
        getExampleFile('default/utils-default-example.component.ts')
    ];
}
