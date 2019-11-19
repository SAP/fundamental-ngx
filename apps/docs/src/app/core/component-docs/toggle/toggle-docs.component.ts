import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import * as toggleSizeExample from '!raw-loader!./examples/toggle-sizes-example/toggle-sizes-example.component.html';
import * as toggleSizeExampleTsCode from '!raw-loader!./examples/toggle-sizes-example/toggle-sizes-example.component.ts';
import * as toggleSizeExampleScssCode from '!raw-loader!./examples/toggle-sizes-example/toggle-sizes-example.component.scss';
import * as toggleDisableExample from '!raw-loader!./examples/disabled-toggle-example/disabled-toggle-example.component.html';
import * as toggleDisableExampleTsCode from '!raw-loader!./examples/disabled-toggle-example/disabled-toggle-example.component.ts';
import * as toggleDisableExampleScssCode from '!raw-loader!./examples/disabled-toggle-example/disabled-toggle-example.component.scss';
import * as toggleBindingExampleHtml from '!raw-loader!./examples/toggle-binding-example/toggle-binding-example.component.html';
import * as toggleBindingExampleTsCode from '!raw-loader!./examples/toggle-binding-example/toggle-binding-example.component.ts';
import * as toggleBindingExampleScssCode from '!raw-loader!./examples/toggle-binding-example/toggle-binding-example.component.scss';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import * as toggleFormExampleHtmlSrc from '!raw-loader!./examples/toggle-form-example/toggle-forms-example.component.html';
import * as toggleFormExampleTsCode from '!raw-loader!./examples/toggle-form-example/toggle-forms-example.component.ts';
import * as semanticToggleExampleHtml from '!raw-loader!./examples/semantic-toggle-example/semantic-toggle-example.component.html';
import * as semanticToggleExampleTs from '!raw-loader!./examples/semantic-toggle-example/semantic-toggle-example.component.ts';
import * as toggleFormExampleScssCode from '!raw-loader!./examples/toggle-form-example/toggle-forms-example.component.scss';
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
            fileName: 'toggle-sizes-example',
            code: toggleSizeExample,
            typescriptFileCode: toggleSizeExampleTsCode,
            component: 'ToggleSizesExampleComponent',
            scssFileCode: toggleSizeExampleScssCode
        }
    ];

    toggleDisable: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'disabled-toggle-example',
            code: toggleDisableExample,
            typescriptFileCode: toggleDisableExampleTsCode,
            component: 'DisabledToggleExampleComponent',
            scssFileCode: toggleDisableExampleScssCode
        }
    ];

    toggleBinding: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'toggle-binding-example',
            code: toggleBindingExampleHtml,
            typescriptFileCode: toggleBindingExampleTsCode,
            component: 'ToggleBindingExampleComponent',
            scssFileCode: toggleBindingExampleScssCode
        }
    ];


    toggleSemantic: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'semantic-toggle-example',
            code: semanticToggleExampleHtml,
            typescriptFileCode: semanticToggleExampleTs,
            component: 'SemanticToggleExampleComponent',
        }
    ];

    toggleFormExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'toggle-forms-example',
            code: toggleFormExampleHtmlSrc,
            scssFileCode: toggleFormExampleScssCode
        },
        {
            language: 'typescript',
            fileName: 'toggle-forms-example',
            code: toggleFormExampleTsCode,
            component: 'ToggleFormsExampleComponent'
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
