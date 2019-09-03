import { Component } from '@angular/core';

import * as comboboxHTMLSrc from '!raw-loader!./examples/combobox-example.component.html';
import * as comboboxTSSrc from '!raw-loader!./examples/combobox-example.component.ts';
import * as comboboxDynHtml from '!raw-loader!./examples/combobox-dynamic-example.component.html';
import * as comboboxDynTs from '!raw-loader!./examples/combobox-dynamic-example.component.ts';
import * as comboboxAsyncHtml from '!raw-loader!./examples/combobox-async-example.component.html';
import * as comboboxAsyncTs from '!raw-loader!./examples/combobox-async-example.component.ts';
import * as comboboxDisplayHtml from '!raw-loader!./examples/combobox-displaywith-example.component.html';
import * as comboboxDisplayTs from '!raw-loader!./examples/combobox-displaywith-example.component.ts';
import * as comboboxTemplateH from '!raw-loader!./examples/combobox-template-example.component.html';
import * as comboboxTemplateT from '!raw-loader!./examples/combobox-template-example.component.ts';
import * as comboboxDisabledTemplateH from '!raw-loader!./examples/combobox-disabled-example.component.html';
import * as comboboxDisabledTemplateT from '!raw-loader!./examples/combobox-disabled-example.component.ts';
import * as comboboxFormT from '!raw-loader!./examples/combobox-forms-example.component.ts';
import * as comboboxFormH from '!raw-loader!./examples/combobox-forms-example.component.html';
import * as comboboxHeightHtml from '!raw-loader!./examples/combobox-height-example.component.html';
import * as comboboxHeightTs from '!raw-loader!./examples/combobox-height-example.component.ts';
import * as comboboxSeaTs from '!raw-loader!./examples/combobox-search-function-example.component.ts';
import * as comboboxSeaHtml from '!raw-loader!./examples/combobox-search-function-example.component.html';
import { ExampleFile } from '../../core-helpers/code-example/example-file';

@Component({
    selector: 'fd-combobox-docs',
    templateUrl: './combobox-docs.component.html'
})
export class ComboboxDocsComponent {

    comboboxBasicExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxHTMLSrc
        },
        {
            language: 'typescript',
            code: comboboxTSSrc
        }
    ];

    comboboxDynamicExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxDynHtml
        },
        {
            language: 'typescript',
            code: comboboxDynTs
        }
    ];

    comboboxSearchFunctionExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxSeaHtml
        },
        {
            language: 'typescript',
            code: comboboxSeaTs
        }
    ];

    comboboxAsyncExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxAsyncHtml
        },
        {
            language: 'typescript',
            code: comboboxAsyncTs
        }
    ];

    comboboxDisplayExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxDisplayHtml
        },
        {
            language: 'typescript',
            code: comboboxDisplayTs
        }
    ];

    comboboxDisabledExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxDisabledTemplateH
        },
        {
            language: 'typescript',
            code: comboboxDisabledTemplateT
        }
    ];

    comboboxTemplateExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxTemplateH
        },
        {
            language: 'typescript',
            code: comboboxTemplateT
        }
    ];

    comboboxHeightExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxHeightHtml
        },
        {
            language: 'typescript',
            code: comboboxHeightTs
        }
    ];

    comboboxFormExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxFormH
        },
        {
            language: 'typescript',
            code: comboboxFormT
        }
    ];

}
