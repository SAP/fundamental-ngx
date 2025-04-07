import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';

import { ListSublineStandardExampleComponent } from './examples/list-subline-standard-example.component';

const sublineSrcHtml = 'list-subline-standard-example.component.html';

@Component({
    selector: 'app-list-subline',
    templateUrl: './list-subline-docs.component.html',
    imports: [ComponentExampleComponent, ListSublineStandardExampleComponent, CodeExampleComponent]
})
export class ListSublineDocsComponent {
    listSubline: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sublineSrcHtml),
            fileName: 'list-subline-standard-example'
        }
    ];
}
