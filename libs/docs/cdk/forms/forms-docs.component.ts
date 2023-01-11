import { Component } from '@angular/core';
import { ExampleFile, getExampleFile } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-forms',
    templateUrl: './forms-docs.component.html'
})
export class FormsDocsComponent {
    formsDefaultExample: ExampleFile[] = [
        getExampleFile('default/forms-default-example.component.html'),
        getExampleFile('default/forms-default-example.component.ts')
    ];
}
