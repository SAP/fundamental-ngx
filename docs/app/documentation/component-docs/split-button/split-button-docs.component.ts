import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as buttonTypesExample from '!raw-loader!./examples/split-button-types-example.component.html';
import * as buttonSplitProgrammaticalyExample from '!raw-loader!./examples/split-button-programmatical-example.component.html';
import * as buttonSplitOptionsExample from '!raw-loader!./examples/split-button-options-example.component.html';
import * as buttonSplitIcons from '!raw-loader!./examples/split-button-icons-example.component.html';
import * as buttonSplitTemplateExample from '!raw-loader!./examples/split-button-template-example.component.html';

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

    buttonHtmlType = buttonTypesExample;
    buttonSplitProgrammaticallyExample = buttonSplitProgrammaticalyExample;
    buttonSplitTemplateExample = buttonSplitTemplateExample;
    buttonSplitOptionsExample = buttonSplitOptionsExample;
    buttonSplitIcons = buttonSplitIcons;

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('button');
    }

    onSchemaValues(data) {
        this.data = data;
    }

    ngOnInit() {}
}
