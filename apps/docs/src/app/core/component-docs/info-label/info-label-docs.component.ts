import { Component } from '@angular/core';
import InfoLableDefaultExample from '!./examples/info-label-default-example.component.html?raw';
import InfoLableTextExample from '!./examples/info-label-text-example.component.html?raw';
import InfoLabelIconTextExample from '!./examples/info-label-text-icon-example.component.html?raw';
import InfoLableNumericIconExample from '!./examples/info-label-icon-numeric-example.component.html?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-info-label',
    templateUrl: './info-label-docs.component.html'
})
export class InfoLabelDocsComponent {
    defaultInfoLabelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: InfoLableDefaultExample,
            fileName: 'Info-label-default-example'
        }
    ];

    InfoLabelTextExample: ExampleFile[] = [
        {
            language: 'html',
            code: InfoLableTextExample,
            fileName: 'info-label-text-example'
        }
    ];

    InfoLabelTextIconExample: ExampleFile[] = [
        {
            language: 'html',
            code: InfoLabelIconTextExample,
            fileName: 'info-label-text-icon-example'
        }
    ];

    InfoLableNumericIconExample: ExampleFile[] = [
        {
            language: 'html',
            code: InfoLableNumericIconExample,
            fileName: 'info-label-icon-numeric-example'
        }
    ];
}
