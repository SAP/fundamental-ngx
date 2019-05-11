import { Component } from '@angular/core';
import * as basicInfiniteTs from '!raw-loader!./examples/infinite-scroll-basic-example/infinite-scroll-basic-example.component.ts';
import * as basicInfiniteHtml from '!raw-loader!./examples/infinite-scroll-basic-example/infinite-scroll-basic-example.component.html';

@Component({
    selector: 'infinite-scroll-docs',
    templateUrl: './infinite-scroll-docs.component.html'
})
export class InfiniteScrollDocsComponent {
    basicInfiniteScrollTs = basicInfiniteTs;
    basicInfiniteScrollHtml = basicInfiniteHtml;
}
