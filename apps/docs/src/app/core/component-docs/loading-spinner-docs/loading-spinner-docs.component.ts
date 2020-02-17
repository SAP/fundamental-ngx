import { Component, OnInit } from '@angular/core';

import * as loadingSpinnerHtml from '!raw-loader!./examples/loading-spinner-example.component.html';
import * as loadingSpinnerContainerHtml from '!raw-loader!./examples/loading-spinner-container-example.component.html';
import * as loadingSpinnerContainerScss from '!raw-loader!./examples/loading-spinner-container-example.component.scss';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as loadingSpinnerContainerTsCode from '!raw-loader!./examples/loading-spinner-container-example.component.ts';

@Component({
    selector: 'app-loading-spinner-docs',
    templateUrl: './loading-spinner-docs.component.html',
    styleUrls: ['./loading-spinner-docs.component.scss']
})
export class LoadingSpinnerDocsComponent implements OnInit {
    loadingSpinnerExample: ExampleFile[] = [
        {
            language: 'html',
            code: loadingSpinnerHtml,
            fileName: 'loading-spinner-example',
        }
    ];

    loadingSpinnerContainerExample: ExampleFile[] = [
        {
            language: 'html',
            code: loadingSpinnerContainerHtml,
            fileName: 'loading-spinner-container-example',
            typescriptFileCode: loadingSpinnerContainerTsCode,
            component: 'LoadingSpinnerContainerExampleComponent',
            scssFileCode: loadingSpinnerContainerScss
        }
    ];

    ngOnInit() { }
}
