import { Component } from '@angular/core';

import * as standardH from '!raw-loader!./examples/scroll-spy-example/scroll-spy-example.component.html';
import * as standardT from '!raw-loader!./examples/scroll-spy-example/scroll-spy-example.component.ts';
import * as standardSCSS from '!raw-loader!./examples/scroll-spy-example/scroll-spy-example.component.scss';

import * as customH from '!raw-loader!./examples/scroll-spy-custom-example/scroll-spy-custom-example.component.html';
import * as customT from '!raw-loader!./examples/scroll-spy-custom-example/scroll-spy-custom-example.component.ts';
import * as customSCSS from '!raw-loader!./examples/scroll-spy-custom-example/scroll-spy-custom-example.component.scss';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-scroll-spy-docs',
    templateUrl: './scroll-spy-docs.component.html',
    styleUrls: ['./scroll-spy-docs.component.scss']
})
export class ScrollSpyDocsComponent {
    scrollSpy: ExampleFile[] = [
        {
            language: 'html',
            code: standardH,
            fileName: 'scroll-spy-example'
        },
        {
            language: 'typescript',
            component: 'ScrollSpyExampleComponent',
            code: standardT,
            fileName: 'scroll-spy-example',
            scssFileCode: standardSCSS
        }
    ];

    scrollSpyCustom: ExampleFile[] = [
        {
            language: 'html',
            code: customH,
            fileName: 'scroll-spy-custom-example',
            scssFileCode: customSCSS
        },
        {
            language: 'typescript',
            component: 'ScrollSpyCustomExampleComponent',
            code: customT,
            fileName: 'scroll-spy-custom-example'
        }
    ];
}
