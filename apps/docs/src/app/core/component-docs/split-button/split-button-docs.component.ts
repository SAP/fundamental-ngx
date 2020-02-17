import { Component, OnInit } from '@angular/core';
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
            typescriptFileCode: buttonTypesExampleTs,
            component: 'ButtonSplitTypesExampleComponent',
        }
    ];

    buttonSplitProgrammaticallyExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSplitProgrammaticalyExample,
            fileName: 'split-button-programmatical-example',
            typescriptFileCode: buttonSplitProgrammaticalyExampleTs,
            component: 'ButtonSplitProgrammaticalExampleComponent',
        }
    ];

    buttonSplitTemplateExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSplitTemplateExample,
            fileName: 'split-button-template-example',
            typescriptFileCode: buttonSplitTemplateExampleTs,
            component: 'ButtonSplitTemplateExampleComponent',
        }
    ];

    buttonSplitOptionsExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSplitOptionsExample,
            fileName: 'split-button-options-example',
            typescriptFileCode: buttonSplitOptionsExampleTs,
            component: 'ButtonSplitOptionsExampleComponent',
        }
    ];

    buttonSplitIcons: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSplitIcons,
            fileName: 'split-button-icons-example',
            typescriptFileCode: buttonSplitIconsTs,
            component: 'ButtonSplitTypesIconsComponent',
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
