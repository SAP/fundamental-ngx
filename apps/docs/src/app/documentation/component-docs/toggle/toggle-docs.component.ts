import { Component } from '@angular/core';
import * as toggleSizeExample from '!raw-loader!./examples/toggle-sizes-example/toggle-sizes-example.component.html';
import * as toggleDisableExample from '!raw-loader!./examples/disabled-toggle-example/disabled-toggle-example.component.html';
import * as toggleBindingExampleHtml from '!raw-loader!./examples/toggle-binding-example/toggle-binding-example.component.html';
import * as toggleBindingExampleTs from '!raw-loader!./examples/toggle-binding-example/toggle-binding-example.component.ts';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import * as toggleFormExampleHtmlSrc from '!raw-loader!./examples/toggle-form-example/toggle-forms-example.component.html';
import * as toggleFormExampleTsSrc from '!raw-loader!./examples/toggle-form-example/toggle-forms-example.component.ts';
import { ExampleFile } from '../../core-helpers/code-example/example-file';

@Component({
    selector: 'app-toggle',
    templateUrl: './toggle-docs.component.html'
})
export class ToggleDocsComponent {

    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    disabled: {
                        type: 'boolean'
                    },
                    checked: {
                        type: 'boolean'
                    }
                }
            },
            modifier: {
                type: 'object',
                properties: {
                    size: {
                        type: 'string',
                        enum: ['default', 'xs', 's', 'l']
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;

    data: any = {
        properties: {
            disabled: false,
            checked: false
        },
        modifier: {
            size: 'default'
        }
    };

    toggleSize: ExampleFile[] = [{
        language: 'html',
        code: toggleSizeExample
    }];

    toggleDisable: ExampleFile[] = [{
        language: 'html',
        code: toggleDisableExample
    }];

    toggleBinding: ExampleFile[] = [
        {
            language: 'html',
            code: toggleBindingExampleHtml,
        },
        {
            language: 'typescript',
            code: toggleBindingExampleTs
        }
    ];

    toggleFormExample: ExampleFile[] = [
        {
            language: 'html',
            code: toggleFormExampleHtmlSrc,
        },
        {
            language: 'typescript',
            code: toggleFormExampleTsSrc
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('toggle');
    }

    onSchemaValues(data) {
        this.data = data;
    }
}
