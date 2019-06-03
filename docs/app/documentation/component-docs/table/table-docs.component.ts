import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as tableHtmlSrc from '!raw-loader!./examples/table-example.component.html';
import * as tableJsSrc from '!raw-loader!./examples/table-example.component.ts';
import * as tableCheckHtml from '!raw-loader!./examples/table-checkboxes-example.component.html';
import * as tableCheckTs from '!raw-loader!./examples/table-checkboxes-example.component.ts';
import * as tableCdkHtml from '!raw-loader!./examples/table-cdk-example.component.html';
import * as tableCdkTs from '!raw-loader!./examples/table-cdk-example.component.ts';

@Component({
    selector: 'app-table',
    templateUrl: './table-docs.component.html'
})
export class TableDocsComponent {

    static schema: Schema = {
        properties: {
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
        state: {
            disabled: false
        }
    };

    tableHtml = tableHtmlSrc;

    tableJs = tableJsSrc;

    tableCheckboxesHtml = tableCheckHtml;

    tableCheckboxesTs = tableCheckTs;

    tableCdkHtml = tableCdkHtml;

    tableCdkTs = tableCdkTs;

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('table');
    }

    onSchemaValues(data) {
        this.data = data;
    }


}
