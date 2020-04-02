import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as segmentedDefaultExample from '!raw-loader!./examples/segmented-button-default-example.component.html';
import * as segmentedToggleExample from '!raw-loader!./examples/segmented-button-toggle-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { Icons } from '../../../documentation/utilities/icons';

@Component({
    selector: 'app-segmented-button',
    templateUrl: './segmented-button-docs.component.html'
})
export class SegmentedButtonDocsComponent implements OnInit {
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
                        enum: ['default', 'is-disabled', 'is-selected']
                    },
                    label2: {
                        type: 'string'
                    },
                    state2: {
                        type: 'string',
                        enum: ['default', 'is-disabled', 'is-selected']
                    },
                    label3: {
                        type: 'string'
                    },
                    state3: {
                        type: 'string',
                        enum: ['default', 'is-disabled', 'is-selected']
                    },
                    icon4: {
                        type: 'string',
                        enum: Icons
                    },
                    state4: {
                        type: 'string',
                        enum: ['default', 'is-disabled', 'is-selected']
                    },
                    icon5: {
                        type: 'string',
                        enum: Icons
                    },
                    state5: {
                        type: 'string',
                        enum: ['default', 'is-disabled', 'is-selected']
                    },
                    icon6: {
                        type: 'string',
                        enum: Icons
                    },
                    state6: {
                        type: 'string',
                        enum: ['default', 'is-disabled', 'is-selected']
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
            code: segmentedToggleExample,
            fileName: 'segmented-button-toggle-example',
        }
    ];

    defaultSizeHtml: ExampleFile[] = [
        {
            language: 'html',
            code: segmentedDefaultExample,
            fileName: 'segmented-button-default-example',
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('segmentedButton');
    }

    ngOnInit() { }

    onSchemaValues(data) {
        this.data = data;
    }
}
