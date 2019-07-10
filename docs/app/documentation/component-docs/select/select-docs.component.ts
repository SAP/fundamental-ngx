import { Component, OnInit } from '@angular/core';

import * as selectBasicSrc from '!raw-loader!./examples/select-basic-example/select-basic-example.component.html';

import * as selectProgSrcH from '!raw-loader!./examples/select-programmatic-example/select-programmatic-example.component.html';
import * as selectProgSrcT from '!raw-loader!./examples/select-programmatic-example/select-programmatic-example.component.ts';

import * as selectNestedSrcH from '!raw-loader!./examples/select-nested-options/select-nested-options.component.html';

import * as customTriggerSrcH from '!raw-loader!./examples/select-custom-trigger/select-custom-trigger.component.html';

import * as selectAddingSrcH from '!raw-loader!./examples/select-adding-example/select-adding-example.component.html';
import * as selectAddingSrcT from '!raw-loader!./examples/select-adding-example/select-adding-example.component.ts';

import * as selectFormSrcH from '!raw-loader!./examples/select-forms/select-forms.component.html';
import * as selectFormSrcT from '!raw-loader!./examples/select-forms/select-forms.component.ts';

import * as selectViewValueH from '!raw-loader!./examples/select-view-value-example/select-view-value-example.component.html';
import * as selectViewValueT from '!raw-loader!./examples/select-view-value-example/select-view-value-example.component.ts';

@Component({
    selector: 'fd-select-docs',
    templateUrl: './select-docs.component.html',
    styleUrls: ['./select-docs.component.scss']
})
export class SelectDocsComponent implements OnInit {

    selectBasicHtml = selectBasicSrc;
    selectProgHtml = selectProgSrcH;
    selectProgTs = selectProgSrcT;
    selectNestedHtml = selectNestedSrcH;
    customTriggerHtml = customTriggerSrcH;
    selectAddingHtml = selectAddingSrcH;
    selectAddingTs = selectAddingSrcT;
    selectFormHtml = selectFormSrcH;
    selectFormTs = selectFormSrcT;
    selectViewValueHtml = selectViewValueH;
    selectViewValueTs = selectViewValueT;

    constructor() {
    }

    ngOnInit() {
    }

}
