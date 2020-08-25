import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as inputGroupStandardExampleHtml from '!raw-loader!./platform-input-group-examples/platform-input-group-standard-example.component.html';
import * as inputGroupCompactExampleHtml from '!raw-loader!./platform-input-group-examples/platform-input-group-compact-example.component.html';
import * as inputGroupStateExampleHtml from '!raw-loader!./platform-input-group-examples/platform-input-group-state-example.component.html';
import * as inputGroupDisabledExampleHtml from '!raw-loader!./platform-input-group-examples/platform-input-group-disabled-example.component.html';

@Component({
    selector: 'app-input-group',
    templateUrl: './platform-input-group-docs.component.html'
})
export class PlatformInputGroupDocsComponent {
    inputGroupStandard: ExampleFile[] = [
        {
            language: 'html',
            code: inputGroupStandardExampleHtml,
            fileName: 'platform-input-group-standard-example'
        }
    ];

    inputGroupCompact: ExampleFile[] = [
        {
            language: 'html',
            code: inputGroupCompactExampleHtml,
            fileName: 'platform-input-group-compact-example'
        }
    ];

    inputGroupState: ExampleFile[] = [
        {
            language: 'html',
            code: inputGroupStateExampleHtml,
            fileName: 'platform-input-group-state-example'
        }
    ];

    inputGroupDisabled: ExampleFile[] = [
        {
            language: 'html',
            code: inputGroupDisabledExampleHtml,
            fileName: 'platform-input-group-disabled-example'
        }
    ];
}
