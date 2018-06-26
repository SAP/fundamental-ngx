import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

@Component({
    selector: 'app-badge-label',
    templateUrl: './badge-label-docs.component.html'
})
export class BadgeLabelDocsComponent implements OnInit {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    text: {
                        type: 'string'
                    },
                    type: {
                        type: 'string',
                        enum: ['label', 'badge']
                    },
                    status: {
                        type: 'string',
                        enum: ['default', 'success', 'warning', 'error']
                    },
                    modifier: {
                        type: 'string',
                        enum: ['default', 'pill', 'filled']
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;

    data: any = {
        properties: {
            text: 'default',
            type: 'badge',
            status: 'default',
            modifier: 'default'
        }
    };

    defaultBadgeHtmlType =
        '<fd-badge>Default</fd-badge>\n' +
        '<fd-badge [status]="\'success\'">Default</fd-badge>\n' +
        '<fd-badge [status]="\'warning\'">Default</fd-badge>\n' +
        '<fd-badge [status]="\'error\'">Default</fd-badge>\n';

    pillBadgeHtmlType =
        '<fd-badge [modifier]="\'pill\'">Default</fd-badge>\n' +
        '<fd-badge [status]="\'success\'" [modifier]="\'pill\'">Default</fd-badge>\n' +
        '<fd-badge [status]="\'warning\'" [modifier]="\'pill\'">Default</fd-badge>\n' +
        '<fd-badge [status]="\'error\'"   [modifier]="\'pill\'">Default</fd-badge>\n';

    filledBadgeHtmlType =
        '<fd-badge [modifier]="\'filled\'">Default</fd-badge>\n' +
        '<fd-badge [status]="\'success\'" [modifier]="\'filled\'">Default</fd-badge>\n' +
        '<fd-badge [status]="\'warning\'" [modifier]="\'filled\'">Default</fd-badge>\n' +
        '<fd-badge [status]="\'error\'"   [modifier]="\'filled\'">Default</fd-badge>\n';

    labelHtmlType =
        '<fd-label>Default</fd-label>\n' +
        '<fd-label [status]="\'success\'">Success</fd-label>\n' +
        '<fd-label [status]="\'warning\'">Warning</fd-label>\n' +
        '<fd-label [status]="\'error\'">Error</fd-label>\n';

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('badgeLabel');
    }

    onSchemaValues(data) {
        this.data = data;
    }

    ngOnInit() {}
}
