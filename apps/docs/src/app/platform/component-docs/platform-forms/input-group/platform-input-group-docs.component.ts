import { Component } from '@angular/core';

import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

import inputGroupStandardExampleHtml from '!./platform-input-group-examples/platform-input-group-standard-example.component.html?raw';
import inputGroupCompactExampleHtml from '!./platform-input-group-examples/platform-input-group-compact-example.component.html?raw';
import inputGroupDisabledExampleHtml from '!./platform-input-group-examples/platform-input-group-disabled-example.component.html?raw';
import inputGroupFormExampleHtml from '!./platform-input-group-examples/platform-input-group-form-example.component.html?raw';

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

    inputGroupDisabled: ExampleFile[] = [
        {
            language: 'html',
            code: inputGroupDisabledExampleHtml,
            fileName: 'platform-input-group-disabled-example'
        }
    ];

    inputGroupForm: ExampleFile[] = [
        {
            language: 'html',
            code: inputGroupFormExampleHtml,
            fileName: 'platform-input-group-form-example'
        }
    ];
}
