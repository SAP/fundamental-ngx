import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as buttonGroupDefaultExample from '!raw-loader!./examples/button-group-default-example.component.html';
import * as buttonGroupDefaultExampleTs from '!raw-loader!./examples/button-group-default-example.component.ts';
import * as buttonGroupToggleExample from '!raw-loader!./examples/button-group-toggle-example.component.html';
import * as buttonGroupToggleExampleTs from '!raw-loader!./examples/button-group-toggle-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';
import { Icons } from '../../../documentation/utilities/icons';

@Component({
    selector: 'app-button-group',
    templateUrl: './button-group-docs.component.html'
})
export class ButtonGroupDocsComponent implements OnInit {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    label1: {
                        type: 'string'
                    },
                    state1: {
                        type: 'string',
                        enum: ['default', 'disabled', 'selected']
                    },
                    label2: {
                        type: 'string'
                    },
                    state2: {
                        type: 'string',
                        enum: ['default', 'disabled', 'selected']
                    },
                    label3: {
                        type: 'string'
                    },
                    state3: {
                        type: 'string',
                        enum: ['default', 'disabled', 'selected']
                    },
                    icon4: {
                        type: 'string',
                        enum: Icons
                    },
                    state4: {
                        type: 'string',
                        enum: ['default', 'disabled', 'selected']
                    },
                    icon5: {
                        type: 'string',
                        enum: Icons
                    },
                    state5: {
                        type: 'string',
                        enum: ['default', 'disabled', 'selected']
                    },
                    icon6: {
                        type: 'string',
                        enum: Icons
                    },
                    state6: {
                        type: 'string',
                        enum: ['default', 'disabled', 'selected']
                    },
                    compact: {
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
            label1: 'Left',
            state1: 'default',
            label2: 'Middle',
            state2: 'default',
            label3: 'Right',
            state3: 'default',
            icon4: 'menu',
            state4: 'default',
            icon5: 'pie-chart',
            state5: 'default',
            icon6: 'pool',
            state6: 'default',
            compact: false
        }
    };


    defaultToggleHtml: ExampleFile[] = [
        {
            language: 'html',
            code: buttonGroupToggleExample,
            fileName: 'button-group-toggle-example',
        }
    ];

    defaultSizeHtml: ExampleFile[] = [
        {
            language: 'html',
            code: buttonGroupDefaultExample,
            fileName: 'button-group-default-example',
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('buttonGroup');
    }

    ngOnInit() { }

    onSchemaValues(data) {
        this.data = data;
    }
}
