import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as buttonGroupCompactExample from '!raw-loader!./examples/button-group-compact-example.component.html';
import * as buttonGroupDefaultExample from '!raw-loader!./examples/button-group-default-example.component.html';
import * as buttonGroupSmallExample from '!raw-loader!./examples/button-group-s-example.component.html';
import * as buttonGroupXsExample from '!raw-loader!./examples/button-group-xs-example.component.html';

import * as buttonGroupTsCode from '!raw-loader!./examples/button-group-examples.component.ts';
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
                    size: {
                        type: 'string',
                        enum: ['default', 'xs', 's']
                    },
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
                    icon1: {
                        type: 'string',
                        enum: Icons
                    },
                    state4: {
                        type: 'string',
                        enum: ['default', 'disabled', 'selected']
                    },
                    icon2: {
                        type: 'string',
                        enum: Icons
                    },
                    state5: {
                        type: 'string',
                        enum: ['default', 'disabled', 'selected']
                    },
                    icon3: {
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
            size: 'default',
            label1: 'Left',
            state1: 'default',
            label2: 'Middle',
            state2: 'default',
            label3: 'Right',
            state3: 'default',
            icon1: '',
            state4: 'default',
            icon2: 'pie-chart',
            state5: 'default',
            icon3: 'pool',
            state6: 'default',
            compact: false
        }
    };

    xsSizeHtml: ExampleFile[] = [
        {
            language: 'html',
            code: buttonGroupXsExample,
            fileName: 'button-group-xs-example',
            component: 'ButtonGroupXsExampleComponent',
            secondFile: 'button-group-examples',
            typescriptFileCode: buttonGroupTsCode
        }
    ];

    sSizeHtml: ExampleFile[] = [
        {
            language: 'html',
            code: buttonGroupSmallExample,
            fileName: 'button-group-s-example',
            component: 'ButtonGroupSmallExampleComponent',
            secondFile: 'button-group-examples',
            typescriptFileCode: buttonGroupTsCode
        }
    ];

    compactSizeHtml: ExampleFile[] = [
        {
            language: 'html',
            code: buttonGroupCompactExample,
            fileName: 'button-group-compact-example',
            component: 'ButtonGroupCompactExampleComponent',
            secondFile: 'button-group-examples',
            typescriptFileCode: buttonGroupTsCode
        }
    ];

    defaultSizeHtml: ExampleFile[] = [
        {
            language: 'html',
            code: buttonGroupDefaultExample,
            fileName: 'button-group-default-example',
            component: 'ButtonGroupDefaultExampleComponent',
            secondFile: 'button-group-examples',
            typescriptFileCode: buttonGroupTsCode
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
