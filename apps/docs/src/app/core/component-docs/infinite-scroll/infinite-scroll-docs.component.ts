import { Component } from '@angular/core';
import basicInfiniteTs from '!./examples/infinite-scroll-basic-example/infinite-scroll-basic-example.component.ts?raw';
import basicInfiniteHtml from '!./examples/infinite-scroll-basic-example/infinite-scroll-basic-example.component.html?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'infinite-scroll-docs',
    templateUrl: './infinite-scroll-docs.component.html'
})
export class InfiniteScrollDocsComponent {
    basicInfiniteExample: ExampleFile[] = [
        {
            language: 'html',
            code: basicInfiniteHtml,
            fileName: 'infinite-scroll-basic-example'
        },
        {
            language: 'typescript',
            code: basicInfiniteTs,
            fileName: 'infinite-scroll-basic-example',
            component: 'InfiniteScrollBasicExampleComponent'
        }
    ];
}
