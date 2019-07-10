import { Component } from '@angular/core';

import * as comboboxHTMLSrc from '!raw-loader!./examples/combobox-example.component.html';
import * as comboboxTSSrc from '!raw-loader!./examples/combobox-example.component.ts';
import * as comboboxDynHtml from '!raw-loader!./examples/combobox-dynamic-example.component.html';
import * as comboboxDynTs from '!raw-loader!./examples/combobox-dynamic-example.component.ts';
import * as comboboxAsyncHtml from '!raw-loader!./examples/combobox-async-example.component.html';
import * as comboboxAsyncTs from '!raw-loader!./examples/combobox-async-example.component.ts';
import * as comboboxDisplayHtml from '!raw-loader!./examples/combobox-displaywith-example.component.html';
import * as comboboxDisplayTs from '!raw-loader!./examples/combobox-displaywith-example.component.ts';

@Component({
    selector: 'fd-combobox-docs',
    templateUrl: './combobox-docs.component.html'
})
export class ComboboxDocsComponent {
    comboboxExampleHtml = comboboxHTMLSrc;
    comboboxExampleTs = comboboxTSSrc;

    comboboxDynamicHtml = comboboxDynHtml;
    comboboxDynamicTs = comboboxDynTs;

    comboboxAsyncHtml = comboboxAsyncHtml;
    comboboxAsyncTs = comboboxAsyncTs;

    displayHtml = comboboxDisplayHtml;
    displayTs = comboboxDisplayTs;

    constructor() {}
}
