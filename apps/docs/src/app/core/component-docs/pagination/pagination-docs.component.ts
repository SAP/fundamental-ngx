import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as paginationSrc from '!raw-loader!./examples/pagination-example.component.ts';

import * as paginationShowingSrc from '!raw-loader!./examples/pagination-showing-example.component.ts';

import * as paginationPerPageHtml from '!raw-loader!./examples/pagination-per-page/pagination-per-page-example.component.html';
import * as paginationPerPageTs from '!raw-loader!./examples/pagination-per-page/pagination-per-page-example.component.ts';

import * as paginationMobileHtml from '!raw-loader!./examples/pagination-mobile/pagination-mobile-example.component.html';
import * as paginationMobileTs from '!raw-loader!./examples/pagination-mobile/pagination-mobile-example.component.ts';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination-docs.component.html'
})
export class PaginationDocsComponent {
    static schema: Schema = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    totalItems: {
                        type: 'integer'
                    },
                    itemsPerPage: {
                        type: 'integer'
                    },
                    currentPage: {
                        type: 'integer'
                    },
                    mobile: {
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
            totalItems: 70,
            itemsPerPage: 2,
            currentPage: 5,
            mobile: false
        }
    };

    paginationBasic: ExampleFile[] = [
        {
            language: 'typescript',
            code: paginationSrc,
            fileName: 'pagination-example',
            component: 'PaginationExampleComponent'
        }
    ];

    paginationShowing: ExampleFile[] = [
        {
            language: 'typescript',
            code: paginationShowingSrc,
            fileName: 'pagination-showing-example',
            component: 'PaginationShowingExampleComponent'
        }
    ];

    paginationPerPageSrc: ExampleFile[] = [
        {
            language: 'html',
            code: paginationPerPageHtml,
            fileName: 'pagination-per-page-example'
        },
        {
            language: 'typescript',
            code: paginationPerPageTs,
            fileName: 'pagination-per-page-example',
            component: 'PaginationPerPageExampleComponent'
        }
    ];

    paginationMobile: ExampleFile[] = [
        {
            language: 'html',
            code: paginationMobileHtml,
            fileName: 'pagination-mobile-example'
        },
        {
            language: 'typescript',
            code: paginationMobileTs,
            fileName: 'pagination-mobile-example',
            component: 'PaginationMobileExampleComponent'
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('pagination');
    }

    onSchemaValues(data): void {
        this.data = data;
    }
}
