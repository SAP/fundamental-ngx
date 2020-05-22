import { Component } from '@angular/core';
import * as microfrontendsBasicHtml from '!raw-loader!./platform-micro-frontends-examples/platform-micro-frontends-basic-example.component.html';
import * as microfrontendsBasicTs from '!raw-loader!./platform-micro-frontends-examples/platform-micro-frontends-basic-example.component.ts';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-link',
    templateUrl: './platform-micro-frontends-docs.component.html'
})
export class PlatformMicroFrontendsDocsComponent {
    microfrontendsExample: ExampleFile[] = [
        {   name: 'template',
            language: 'html',
            code: microfrontendsBasicHtml,
            fileName: 'platform-micro-frontends-basic-example'
        },
        {   name: 'js code',
            main: true,
            language: 'typescript',
            code: microfrontendsBasicTs,
            component: 'PlatformMicroFrontendsBasicExampleComponent',
            fileName: 'platform-micro-frontends-basic-example'
        }
    ];


    constructor() { }
}
