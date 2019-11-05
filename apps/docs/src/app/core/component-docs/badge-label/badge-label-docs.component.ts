import { Component, OnInit, ViewChildren, ElementRef, QueryList, AfterViewInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as badgeTsCode from '!raw-loader!./examples/badge-label-examples.component.ts';
import * as badgeDefaultExample from '!raw-loader!./examples/badge-default-example.component.html';
import * as badgeFilledExample from '!raw-loader!./examples/badge-filled-example.component.html';
import * as badgePillExample from '!raw-loader!./examples/badge-pill-example.component.html';
import * as labelBuildStatusExample from '!raw-loader!./examples/label-build-status-example.component.html';
import * as labelDefaultExample from '!raw-loader!./examples/label-default-example.component.html';
import * as labelIconStatusExample from '!raw-loader!./examples/label-icon-status-example.component.html';
import * as labelStatusColorsExample from '!raw-loader!./examples/label-status-colors-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';
import { Icons } from '../../../documentation/utilities/icons';

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
            secondFile: 'badge-label-examples',
            typescriptFileCode: badgeTsCode
        }
    ];

    pillBadgeHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: badgePillExample,
            fileName: 'badge-pill-example',
            secondFile: 'badge-label-examples',
            typescriptFileCode: badgeTsCode
        }
    ];

    filledBadgeHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: badgeFilledExample,
            fileName: 'badge-filled-example',
            secondFile: 'badge-label-examples',
            typescriptFileCode: badgeTsCode
        }
    ];

    labelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: labelDefaultExample,
            fileName: 'label-default-example',
            secondFile: 'badge-label-examples',
            typescriptFileCode: badgeTsCode
        }
    ];

    statusIconLabelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: labelBuildStatusExample,
            fileName: 'label-build-status-example',
            secondFile: 'badge-label-examples',
            typescriptFileCode: badgeTsCode
        }
    ];

    anyIconLabelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: labelIconStatusExample,
            fileName: 'label-icon-status-example',
            secondFile: 'badge-label-examples',
            typescriptFileCode: badgeTsCode
        }
    ];

    semanticColorLabelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: labelStatusColorsExample,
            fileName: 'label-status-colors-example',
            secondFile: 'badge-label-examples',
            typescriptFileCode: badgeTsCode
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('badgeLabel');
    }

    ngOnInit() { }
    onSchemaValues(data) {
        this.data = data;
    }
}
