import { Component, ViewEncapsulation } from '@angular/core';

import * as tabSrc from '!raw-loader!./examples/search-example/search-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-search',
    templateUrl: './search-docs.component.html',
    styleUrls: ['search-docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SearchDocsComponent {
    searchExample: ExampleFile[] = [
        {
            language: 'html',
            code: tabSrc,
            fileName: 'search-example'
        }
    ];
}
