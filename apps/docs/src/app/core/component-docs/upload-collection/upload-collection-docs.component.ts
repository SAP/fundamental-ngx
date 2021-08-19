import { Component } from '@angular/core';

import * as uploadCollectionTs from '!raw-loader!./examples/upload-collection-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-upload-collection',
    templateUrl: './upload-collection-docs.component.html'
})
export class UploadCollectionDocsComponent {
    uploadCollection: ExampleFile[] = [
        {
            language: 'html',
            code: uploadCollectionTs,
            typescriptFileCode: uploadCollectionTs,
            fileName: 'upload-collection-example',
            component: 'UploadCollectionExampleComponent'
        }
    ];
}
