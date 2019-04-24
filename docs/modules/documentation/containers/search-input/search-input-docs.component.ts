import { Component } from '@angular/core';

import * as searchInputHTMLSrc from '!raw-loader!./examples/search-input-example.component.html';
import * as searchInputTSSrc from '!raw-loader!./examples/search-input-example.component.ts';
import * as searchInputDynHtml from '!raw-loader!./examples/search-input-dynamic-example.component.html';
import * as searchInputDynTs from '!raw-loader!./examples/search-input-dynamic-example.component.ts';
import * as searchInputAsyncHtml from '!raw-loader!./examples/search-input-async-example.component.html';
import * as searchInputAsyncTs from '!raw-loader!./examples/search-input-async-example.component.ts';
import * as searchInputDisplayHtml from '!raw-loader!./examples/search-input-displaywith-example.component.html';
import * as searchInputDisplayTs from '!raw-loader!./examples/search-input-displaywith-example.component.ts';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input-docs.component.html'
})
export class SearchInputDocsComponent {
    searchInputExampleHtml = searchInputHTMLSrc;
    searchInputExampleTs = searchInputTSSrc;

    searchInputDynamicHtml = searchInputDynHtml;
    searchInputDynamicTs = searchInputDynTs;

    searchInputAsyncHtml = searchInputAsyncHtml;
    searchInputAsyncTs = searchInputAsyncTs;

    displayHtml = searchInputDisplayHtml;
    displayTs = searchInputDisplayTs;

    constructor() {}
}
