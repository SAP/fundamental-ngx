import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as selectBasicSrc from '!raw-loader!./examples/select-basic-example/select-basic-example.component.html';
import * as selectBasicTsSrc from '!raw-loader!./examples/select-basic-example/select-basic-example.component.ts';
import * as selectBasicScssSrc from '!raw-loader!./examples/select-basic-example/select-basic-example.component.scss';

import * as selectProgSrcH from '!raw-loader!./examples/select-programmatic-example/select-programmatic-example.component.html';
import * as selectProgSrcS from '!raw-loader!./examples/select-programmatic-example/select-programmatic-example.component.scss';
import * as selectProgSrcT from '!raw-loader!./examples/select-programmatic-example/select-programmatic-example.component.ts';

import * as selectNestedSrcH from '!raw-loader!./examples/select-nested-options/select-nested-options.component.html';
import * as selectNestedSrcHTs from '!raw-loader!./examples/select-nested-options/select-nested-options.component.ts';
import * as selectNestedSrcScss from '!raw-loader!./examples/select-nested-options/select-nested-options.component.scss';

import * as customTriggerSrcH from '!raw-loader!./examples/select-custom-trigger/select-custom-trigger.component.html';
import * as customTriggerSrcHTs from '!raw-loader!./examples/select-custom-trigger/select-custom-trigger.component.ts';
import * as customTriggerSrcScss from '!raw-loader!./examples/select-custom-trigger/select-custom-trigger.component.scss';

import * as selectAddingSrcH from '!raw-loader!./examples/select-adding-example/select-adding-example.component.html';
import * as selectAddingSrcScss from '!raw-loader!./examples/select-adding-example/select-adding-example.component.scss';
import * as selectAddingSrcT from '!raw-loader!./examples/select-adding-example/select-adding-example.component.ts';

import * as selectFormSrcH from '!raw-loader!./examples/select-forms/select-forms.component.html';
import * as selectFormSrcT from '!raw-loader!./examples/select-forms/select-forms.component.ts';

import * as selectViewValueH from '!raw-loader!./examples/select-view-value-example/select-view-value-example.component.html';
import * as selectViewValueT from '!raw-loader!./examples/select-view-value-example/select-view-value-example.component.ts';

import * as selectMaxHeightH from '!raw-loader!./examples/select-height/select-max-height-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import * as selectMaxHeightHTs from '!raw-loader!./examples/select-height/select-max-height-example.component.ts';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fd-select-docs',
    templateUrl: './select-docs.component.html',
    styleUrls: ['./select-docs.component.scss']
})
export class SelectDocsComponent implements OnInit {
    selectBasic: ExampleFile[] = [
        {
            language: 'html',
            code: selectBasicSrc,
            fileName: 'select-basic-example',
            scssFileCode: selectBasicScssSrc,
            typescriptFileCode: selectBasicTsSrc,
            component: 'SelectBasicExampleComponent'
        }
    ];

    selectProg: ExampleFile[] = [
        {
            language: 'html',
            code: selectProgSrcH,
            fileName: 'select-programmatic-example',
            scssFileCode: selectProgSrcS

        },
        {
            language: 'typescript',
            component: 'SelectProgrammaticExampleComponent',
            code: selectProgSrcT,
            fileName: 'select-programmatic-example',
        }
    ];

    selectNested: ExampleFile[] = [
        {
            language: 'html',
            code: selectNestedSrcH,
            fileName: 'select-nested-options',
            typescriptFileCode: selectNestedSrcHTs,
            component: 'SelectNestedOptionsComponent',
            scssFileCode: selectNestedSrcScss
        }
    ];

    customTrigger: ExampleFile[] = [
        {
            language: 'html',
            code: customTriggerSrcH,
            fileName: 'select-custom-trigger',
            secondFile: 'select-custom-trigger',
            typescriptFileCode: customTriggerSrcHTs,
            component: 'SelectCustomTriggerComponent',
            scssFileCode: customTriggerSrcScss
        }
    ];

    selectAdding: ExampleFile[] = [
        {
            language: 'html',
            code: selectAddingSrcH,
            fileName: 'select-adding-example',
            scssFileCode: selectAddingSrcScss
        },
        {
            language: 'typescript',
            component: 'SelectAddingExampleComponent',
            code: selectAddingSrcT,
            fileName: 'select-adding-example',
        }
    ];

    selectForm: ExampleFile[] = [
        {
            language: 'html',
            code: selectFormSrcH,
            fileName: 'select-forms',

        },
        {
            language: 'typescript',
            component: 'SelectFormsComponent',
            code: selectFormSrcT,
            fileName: 'select-forms',
        }
    ];

    selectMaxHeight: ExampleFile[] = [
        {
            language: 'html',
            code: selectMaxHeightH,
            fileName: 'select-max-height-example',
            secondFile: 'select-max-height-example',
            typescriptFileCode: selectMaxHeightHTs,
            component: 'SelectMaxHeightExampleComponent'
        }
    ];

    selectViewValue: ExampleFile[] = [
        {
            language: 'html',
            code: selectViewValueH,
            fileName: 'select-view-value-example',
        },
        {
            language: 'typescript',
            component: 'SelectViewValueExampleComponent',
            code: selectViewValueT,
            fileName: 'select-view-value-example',
        }
    ];

    ngOnInit() { }
}
