import { Component } from '@angular/core';

import * as searchInputHTMLSrc from '!raw-loader!./examples/search-input-example.component.html';
import * as searchInputTSSrc from '!raw-loader!./examples/search-input-example.component.ts';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input-docs.component.html'
})
export class SearchInputDocsComponent {
    searchInputExampleHtml = searchInputHTMLSrc;
    searchInputExampleTs = searchInputTSSrc;

    constructor() {}
}
