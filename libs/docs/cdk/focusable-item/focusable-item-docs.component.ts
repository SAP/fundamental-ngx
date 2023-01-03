import { Component } from '@angular/core';
import { ExampleFile, getExampleFile } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-focusable-item',
    templateUrl: './focusable-item-docs.component.html'
})
export class FocusableItemDocsComponent {
    focusableItemDefaultExample: ExampleFile[] = [
        getExampleFile('default/focusable-item-default-example.component.html'),
        getExampleFile('default/focusable-item-default-example.component.ts')
    ];
}
