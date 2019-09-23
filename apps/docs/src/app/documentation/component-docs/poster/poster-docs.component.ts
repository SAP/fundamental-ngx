import { Component } from '@angular/core';
import { ExampleFile } from '../../core-helpers/code-example/example-file';
import * as posterHtml from '!raw-loader!./examples/poster-example.component.ts';

@Component({
    selector: 'app-poster',
    templateUrl: './poster-docs.component.html'
})
export class PosterDocsComponent {
    posterUno: ExampleFile[] = [
        {
            language: 'html',
            code: posterHtml
        }
    ];
}
