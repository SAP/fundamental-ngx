import { Component } from '@angular/core';
import * as basicInfiniteTs from '!raw-loader!./examples/infinite-scroll-basic-example/infinite-scroll-basic-example.component.ts';
import * as basicInfiniteHtml from '!raw-loader!./examples/infinite-scroll-basic-example/infinite-scroll-basic-example.component.html';
import { ExampleFile } from '../../core-helpers/code-example/example-file';

@Component({
    selector: 'infinite-scroll-docs',
    templateUrl: './infinite-scroll-docs.component.html'
})
export class InfiniteScrollDocsComponent {

    basicInfiniteExample: ExampleFile[] = [
        {
            language: 'html',
            code: basicInfiniteHtml
        },
        {
            language: 'typescript',
            code: basicInfiniteTs
        }
    ];
}
