import { Component, OnInit } from '@angular/core';

import * as comboboxInputExampleHtmlSrc from '!raw-loader!./examples/combobox-input-example.component.html';
import * as comboboxInputExampleJsSrc from '!raw-loader!./examples/combobox-input-example.component.ts';

@Component({
    selector: 'fd-combobox-input-docs',
    templateUrl: './combobox-input-docs.component.html',
    styleUrls: ['./combobox-input-docs.component.scss']
})
export class ComboboxInputDocsComponent implements OnInit {
    constructor() {}
    ngOnInit() {}

    comboboxInputExampleHtmlSource = comboboxInputExampleHtmlSrc;
    comboboxInputExampleJsSource = comboboxInputExampleJsSrc;
}
