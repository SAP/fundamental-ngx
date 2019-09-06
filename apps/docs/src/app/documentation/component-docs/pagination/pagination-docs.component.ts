import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as paginationSrc from '!raw-loader!./examples/pagination-example.component.ts';
import { ExampleFile } from '../../core-helpers/code-example/example-file';

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
                    displayText: {
                        type: 'string'
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
            displayText: 'items'
        }
    };

    paginationBasic: ExampleFile[] = [{
        language: 'typescript',
        code: paginationSrc
    }];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('pagination');
    }

    onSchemaValues(data) {
        this.data = data;
    }
}
