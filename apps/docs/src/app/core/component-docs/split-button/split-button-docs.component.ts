import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as buttonSplitOptionsExampleTs from '!raw-loader!./examples/split-button-options-example.component.ts';
import * as buttonSplitProgrammaticalyExampleTs from '!raw-loader!./examples/split-button-programmatical-example.component.ts';
import * as buttonSplitTemplateExampleTs from '!raw-loader!./examples/split-button-template-example.component.ts';
import * as buttonTypesExampleTs from '!raw-loader!./examples/split-button-types-example.component.ts';
import * as buttonSplitIconsTs from '!raw-loader!./examples/split-button-icons-example.component.ts';
import * as buttonTypesExample from '!raw-loader!./examples/split-button-types-example.component.html';
import * as splitButtonScsscode from '!raw-loader!./examples/split-button-examples.component.scss';
import * as buttonSplitProgrammaticalyExample from '!raw-loader!./examples/split-button-programmatical-example.component.html';
import * as buttonSplitOptionsExample from '!raw-loader!./examples/split-button-options-example.component.html';
import * as buttonSplitIcons from '!raw-loader!./examples/split-button-icons-example.component.html';
import * as buttonSplitTemplateExample from '!raw-loader!./examples/split-button-template-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-split-button',
    templateUrl: './split-button-docs.component.html'
})
export class SplitButtonDocsComponent implements OnInit {
    schema: Schema;

    data: any = {
        properties: {
            label: 'click here',
            fdType: 'default',
            option: 'default',
            size: 'default',
            icon: ''
        }
    };

    buttonHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: buttonTypesExample,
            fileName: 'split-button-types-example',
            secondFile: 'split-button-examples',
            typescriptFileCode: buttonTypesExampleTs,
            component: 'ButtonSplitTypesExampleComponent',
            scssFileCode: splitButtonScsscode,
        }
    ];

    buttonSplitProgrammaticallyExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSplitProgrammaticalyExample,
            fileName: 'split-button-programmatical-example',
            secondFile: 'split-button-examples',
            typescriptFileCode: buttonSplitProgrammaticalyExampleTs,
            component: 'ButtonSplitProgrammaticalExampleComponent',
            scssFileCode: splitButtonScsscode,
        }
    ];

    buttonSplitTemplateExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSplitTemplateExample,
            fileName: 'split-button-template-example',
            secondFile: 'split-button-examples',
            typescriptFileCode: buttonSplitTemplateExampleTs,
            component: 'ButtonSplitTemplateExampleComponent',
            scssFileCode: splitButtonScsscode,
        }
    ];

    buttonSplitOptionsExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSplitOptionsExample,
            fileName: 'split-button-options-example',
            secondFile: 'split-button-examples',
            typescriptFileCode: buttonSplitOptionsExampleTs,
            component: 'ButtonSplitOptionsExampleComponent',
            scssFileCode: splitButtonScsscode,
        }
    ];

    buttonSplitIcons: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSplitIcons,
            fileName: 'split-button-icons-example',
            secondFile: 'split-button-examples',
            typescriptFileCode: buttonSplitIconsTs,
            component: 'ButtonSplitTypesIconsComponent',
            scssFileCode: splitButtonScsscode,
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('button');
    }

    ngOnInit() { }
    onSchemaValues(data) {
        this.data = data;
    }
}
