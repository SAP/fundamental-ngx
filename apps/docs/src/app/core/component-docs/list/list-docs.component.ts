import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as listSrc from '!raw-loader!./examples/list-example.component.html';
import * as listActionsSrc from '!raw-loader!./examples/list-actions-example.component.html';
import * as listCheckboxSrc from '!raw-loader!./examples/list-checkbox-example.component.html';
import * as infiniteScrollSrcHtml from '!raw-loader!./examples/list-infinite-scroll-example.component.html';
import * as infiniteScrollSrcTs from '!raw-loader!./examples/list-infinite-scroll-example.component.ts';
import * as listSingleHtml from '!raw-loader!./examples/list-single-select-example.component.html';
import * as listSingleTs from '!raw-loader!./examples/list-single-select-example.component.ts';
import * as listCheckboxFormHtmlSrc from '!raw-loader!./examples/list-checkbox-form-example.component.html';
import * as listCheckboxFormTsSrc from '!raw-loader!./examples/list-checkbox-form-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { Icons } from '../../../documentation/utilities/icons';

@Component({
    selector: 'app-list',
    templateUrl: './list-docs.component.html'
})
export class ListDocsComponent implements OnInit {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    items: {
                        type: ''
                    },
                    action: {
                        type: 'object',
                        properties: {
                            icon: {
                                type: 'string',
                                enum: Icons
                            },
                            label: {
                                type: 'string'
                            }
                        }
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;

    data: any = {
        properties: {
            items: ['List Item 1', 'List Item 2', 'List Item 3', 'List Item 4'],
            action: {
                icon: 'edit',
                label: 'Delete'
            }
        }
    };

    simpleList: ExampleFile[] = [
        {
            language: 'html',
            code: listSrc,
            fileName: 'list-example',
        }
    ];

    listActions: ExampleFile[] = [
        {
            language: 'html',
            code: listActionsSrc,
            fileName: 'list-actions-example',
        }
    ];

    listCheckboxes: ExampleFile[] = [
        {
            language: 'html',
            code: listCheckboxSrc,
            fileName: 'list-checkbox-example',
        }
    ];

    listSingleSelect: ExampleFile[] = [
        {
            language: 'html',
            code: listSingleHtml,
            fileName: 'list-single-select-example'
        },
        {
            language: 'typescript',
            code: listSingleTs,
            fileName: 'list-single-select-example',
            component: 'ListSingleSelectExampleComponent'
        }
    ];

    infiniteScrollCode: ExampleFile[] = [
        {
            language: 'html',
            code: infiniteScrollSrcHtml,
            fileName: 'list-infinite-scroll-example'
        },
        {
            language: 'typescript',
            code: infiniteScrollSrcTs,
            fileName: 'list-infinite-scroll-example',
            component: 'ListInfiniteScrollExampleComponent'
        }
    ];

    listCheckboxForm: ExampleFile[] = [
        {
            language: 'html',
            code: listCheckboxFormHtmlSrc,
            fileName: 'list-checkbox-form-example'
        },
        {
            language: 'typescript',
            code: listCheckboxFormTsSrc,
            fileName: 'list-checkbox-form-example',
            component: 'ListCheckboxFormExampleComponent'
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('list');
    }

    ngOnInit() { }
    onSchemaValues(data) {
        this.data = data;
    }
}
