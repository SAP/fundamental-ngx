import { Component } from '@angular/core';

import infoLabelDefaultExampleHtml from '!./examples/default/info-label-default-example.component.html?raw';
import infoLabelDefaultExampleTs from '!./examples/default/info-label-default-example.component.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-info-label',
    templateUrl: './info-label-docs.component.html'
})
export class InfoLabelDocsComponent {
    infoLabelDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'info-label-default-example',
            code: infoLabelDefaultExampleHtml
        },
        {
            language: 'typescript',
            code: infoLabelDefaultExampleTs,
            fileName: 'info-label-default-example',
            component: 'InfoLabelDefaultExampleComponent'
        }
    ];
}
