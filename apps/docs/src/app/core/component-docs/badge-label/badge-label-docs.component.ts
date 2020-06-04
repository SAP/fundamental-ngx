import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import * as badgeSccsCode from '!raw-loader!./examples/badge-label-examples.component.scss';
import * as badgeDefaultExample from '!raw-loader!./examples/badge-default-example.component.html';
import * as badgeFilledExample from '!raw-loader!./examples/badge-filled-example.component.html';
import * as badgePillExample from '!raw-loader!./examples/badge-pill-example.component.html';
import * as labelBuildStatusExample from '!raw-loader!./examples/label-build-status-example.component.html';
import * as labelDefaultExample from '!raw-loader!./examples/label-default-example.component.html';
import * as labelIconStatusExample from '!raw-loader!./examples/label-icon-status-example.component.html';
import * as labelStatusColorsExample from '!raw-loader!./examples/label-status-colors-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { Icons } from '../../../documentation/utilities/icons';

@Component({
    selector: 'app-badge-label',
    templateUrl: './badge-label-docs.component.html'
})
export class BadgeLabelDocsComponent {
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
                        enum: ['badge', 'label', 'status label']
                    },
                    status: {
                        type: 'string',
                        enum: ['default', 'success', 'warning', 'error']
                    },
                    statusIcon: {
                        type: 'string',
                        enum: ['available', 'away', 'busy', 'offline']
                    },
                    icon: {
                        type: 'string',
                        enum: Icons
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

    defaultBadgeHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: badgeDefaultExample,
            fileName: 'badge-default-example',
            scssFileCode: badgeSccsCode
        }
    ];

    pillBadgeHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: badgePillExample,
            fileName: 'badge-pill-example',
            scssFileCode: badgeSccsCode
        }
    ];

    filledBadgeHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: badgeFilledExample,
            fileName: 'badge-filled-example',
            scssFileCode: badgeSccsCode
        }
    ];

    labelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: labelDefaultExample,
            fileName: 'label-default-example',
            scssFileCode: badgeSccsCode
        }
    ];

    statusIconLabelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: labelBuildStatusExample,
            fileName: 'label-build-status-example',
            scssFileCode: badgeSccsCode
        }
    ];

    anyIconLabelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: labelIconStatusExample,
            fileName: 'label-icon-status-example',
            scssFileCode: badgeSccsCode
        }
    ];

    semanticColorLabelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: labelStatusColorsExample,
            fileName: 'label-status-colors-example',
            scssFileCode: badgeSccsCode
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('badgeLabel');
    }

    onSchemaValues(data) {
        this.data = data;
    }
}
