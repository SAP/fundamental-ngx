import { Component } from '@angular/core';
import { ExampleFile, getExampleFile } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-tabbable',
    templateUrl: './tabbable-docs.component.html'
})
export class TabbableDocsComponent {
    tabbableDefaultExample: ExampleFile[] = [
        getExampleFile('default/tabbable-default-example.component.html'),
        getExampleFile('default/tabbable-default-example.component.ts')
    ];
}
