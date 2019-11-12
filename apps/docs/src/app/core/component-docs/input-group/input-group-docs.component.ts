import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as inputGroupButtonSrc from '!raw-loader!./examples/input-group-button-example.component.html';
import * as inputGroupIconSrc from '!raw-loader!./examples/input-group-icon-example.component.html';
import * as inputGroupNumberSrc from '!raw-loader!./examples/input-group-number-example.component.html';
import * as inputGroupSearchSrc from '!raw-loader!./examples/input-group-search-example.component.html';
import * as inputGroupTextSrc from '!raw-loader!./examples/input-group-text-example.component.html';
import * as inputGroupTextCompactSrc from '!raw-loader!./examples/input-group-text-compact-example.component.html';
import * as inputGroupTscode from '!raw-loader!./examples/input-group-examples.component.ts';
import * as formInputTsSrc from '!raw-loader!./examples/input-group-form-example.component.ts';
import * as formInputHtmlSrc from '!raw-loader!./examples/input-group-form-example.component.html';
import * as complexInputHtml from '!raw-loader!./examples/input-group-complex-example.component.html';
import * as formInputScssSrc from '!raw-loader!./examples/input-group-form-example.component.scss';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { Icons } from '../../../documentation/utilities/icons';

@Component({
    selector: 'app-input-group',
    templateUrl: './input-group-docs.component.html'
})
export class InputGroupDocsComponent implements OnInit {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    placement: {
                        type: 'string',
                        enum: ['before', 'after']
                    },
                    inline: {
                        type: 'boolean'
                    },
                    placeholder: {
                        type: 'string'
                    },
                    ngModel: {
                        type: 'string'
                    },
                    addOnText: {
                        type: 'string'
                    },
                    glyph: {
                        type: 'string',
                        enum: Icons
                    },
                    button: {
                        type: 'boolean'
                    }
                }
            },
            state: {
                type: 'object',
                properties: {
                    disabled: {
                        type: 'boolean'
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;
    data: any = {
        properties: {
            placement: 'after',
            inline: false,
            placeholder: '',
            ngModel: '10000',
            addOnType: 'text',
            addOnText: '€',
            glyph: '',
            button: false
        },
        state: {
            disabled: false
        }
    };

    textAddOn: ExampleFile[] = [
        {
            language: 'html',
            code: inputGroupTextSrc,
            fileName: 'input-group-text-example',
            secondFile: 'input-group-examples',
            typescriptFileCode: inputGroupTscode,
            component: 'InputGroupTextExampleComponent'
        }
    ];

    iconAddOn: ExampleFile[] = [
        {
            language: 'html',
            code: inputGroupIconSrc,
            fileName: 'input-group-icon-example',
            secondFile: 'input-group-examples',
            typescriptFileCode: inputGroupTscode,
            component: 'InputGroupIconExampleComponent'
        }
    ];

    buttonIconAddOn: ExampleFile[] = [
        {
            language: 'html',
            code: inputGroupButtonSrc,
            fileName: 'input-group-button-example',
            secondFile: 'input-group-examples',
            typescriptFileCode: inputGroupTscode,
            component: 'InputGroupButtonExampleComponent'
        }
    ];

    numberInput: ExampleFile[] = [
        {
            language: 'html',
            code: inputGroupNumberSrc,
            fileName: 'input-group-number-example',
            secondFile: 'input-group-examples',
            typescriptFileCode: inputGroupTscode,
            component: 'InputGroupNumberExampleComponent'
        }
    ];

    searchInput: ExampleFile[] = [
        {
            language: 'html',
            code: inputGroupSearchSrc,
            fileName: 'input-group-search-example',
            secondFile: 'input-group-examples',
            typescriptFileCode: inputGroupTscode,
            component: 'InputGroupSearchExampleComponent'
        }
    ];

    textCompact: ExampleFile[] = [
        {
            language: 'html',
            code: inputGroupTextCompactSrc,
            fileName: 'input-group-compact-example',
            secondFile: 'input-group-examples',
            typescriptFileCode: inputGroupTscode,
            component: 'InputGroupTextCompactExampleComponent'
        }
    ];

    formInput: ExampleFile[] = [
        {
            language: 'html',
            code: formInputHtmlSrc,
            fileName: 'input-group-form-example',
            scssFileCode: formInputScssSrc
        },
        {
            language: 'typescript',
            code: formInputTsSrc,
            fileName: 'input-group-form-example',
            component: 'InputGroupFormExampleComponent'
        }
    ];

    complexInput: ExampleFile[] = [
        {
            language: 'html',
            code: complexInputHtml,
            fileName: 'input-group-number-example',
            secondFile: 'input-group-examples',
            typescriptFileCode: inputGroupTscode,
            component: 'InputGroupComplexExampleComponent'
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('inputGroup');
    }

    ngOnInit() { }
    onSchemaValues(data) {
        this.data = data;
    }
}
