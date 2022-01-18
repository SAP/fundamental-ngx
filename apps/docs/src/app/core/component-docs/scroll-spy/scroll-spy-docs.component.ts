import { Component } from '@angular/core';

import standardH from '!./examples/scroll-spy-example/scroll-spy-example.component.html?raw';
import standardT from '!./examples/scroll-spy-example/scroll-spy-example.component.ts?raw';
import standardSCSS from '!./examples/scroll-spy-example/scroll-spy-example.component.scss?raw';

import customH from '!./examples/scroll-spy-custom-example/scroll-spy-custom-example.component.html?raw';
import customT from '!./examples/scroll-spy-custom-example/scroll-spy-custom-example.component.ts?raw';
import customSCSS from '!./examples/scroll-spy-custom-example/scroll-spy-custom-example.component.scss?raw';
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
