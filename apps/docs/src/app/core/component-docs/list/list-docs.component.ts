import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as listSrc from '!raw-loader!./examples/list-example.component.html';
import * as listSecondarySrc from '!raw-loader!./examples/list-secondary-example.component.html';
import * as iconListSrc from '!raw-loader!./examples/list-icon-example.component.html';
import * as complexList from '!raw-loader!./examples/list-complex-example.component.html';
import * as infiniteScrollSrcHtml from '!raw-loader!./examples/list-infinite-scroll-example.component.html';
import * as infiniteScrollSrcTs from '!raw-loader!./examples/list-infinite-scroll-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { Icons } from '../../../documentation/utilities/icons';

@Component({
    selector: 'app-list',
    templateUrl: './list-docs.component.html'
})
export class ListDocsComponent {
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

    secondaryList: ExampleFile[] = [
        {
            language: 'html',
            code: listSecondarySrc,
            fileName: 'list-example-secondary',
        }
    ];

    iconList: ExampleFile[] = [
        {
            language: 'html',
            code: iconListSrc,
            fileName: 'list-icon-example',
        }
    ];

    listComplex: ExampleFile[] = [
        {
            language: 'html',
            code: complexList,
            fileName: 'list-complex-example',
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

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('list');
    }

    onSchemaValues(data) {
        this.data = data;
    }
}
