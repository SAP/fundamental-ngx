import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import * as toggleSizeExample from '!raw-loader!./examples/toggle-sizes-example/toggle-sizes-example.component.html';
import * as toggleSizeExampleTsCode from '!raw-loader!./examples/toggle-sizes-example/toggle-sizes-example.component.ts';
import * as toggleDisableExample from '!raw-loader!./examples/disabled-toggle-example/disabled-toggle-example.component.html';
import * as toggleDisableExampleTsCode from '!raw-loader!./examples/disabled-toggle-example/disabled-toggle-example.component.ts';
import * as toggleBindingExampleHtml from '!raw-loader!./examples/toggle-binding-example/toggle-binding-example.component.html';
import * as toggleBindingExampleTsCode from '!raw-loader!./examples/toggle-binding-example/toggle-binding-example.component.ts';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import * as toggleFormExampleHtmlSrc from '!raw-loader!./examples/toggle-form-example/toggle-forms-example.component.html';
import * as toggleFormExampleTsCode from '!raw-loader!./examples/toggle-form-example/toggle-forms-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-toggle',
    templateUrl: './toggle-docs.component.html'
})
export class ToggleDocsComponent implements OnInit {
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

    toggleSize: ExampleFile[] = [
        {
            language: 'html',
            code: toggleSizeExample,
            secondFile: 'disabled-toggle-example',
            typescriptFileCode: toggleDisableExampleTsCode
        }
    ];

    toggleDisable: ExampleFile[] = [
        {
            language: 'html',
            code: toggleDisableExample,
            secondFile: 'toggle-binding-example',
            typescriptFileCode: toggleBindingExampleTsCode
        }
    ];

    toggleBinding: ExampleFile[] = [
        {
            language: 'html',
            code: toggleBindingExampleHtml,
        },
        {
            language: 'typescript',
            code: toggleBindingExampleTsCode,
            secondFile: 'toggle-sizes-example',
            typescriptFileCode: toggleSizeExampleTsCode
        }
    ];

    toggleFormExample: ExampleFile[] = [
        {
            language: 'html',
            code: toggleFormExampleHtmlSrc
        },
        {
            language: 'typescript',
            code: toggleFormExampleTsCode
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('toggle');
    }

    ngOnInit() { }
    onSchemaValues(data) {
        this.data = data;
    }
}
