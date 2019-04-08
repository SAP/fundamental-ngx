import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as tabSrc from '!raw-loader!./examples/tabs-example.component.html';
import * as tabSelectionSrc from '!raw-loader!./examples/tab-selection-example.component.html';
import * as tabAddH from '!raw-loader!./examples/adding-tab-example/adding-tab-example.component.html';
import * as tabAddT from '!raw-loader!./examples/adding-tab-example/adding-tab-example.component.ts';
import * as complexTabH from '!raw-loader!./examples/complex-title-example/complex-title-example.component.html';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs-docs.component.html'
})
export class TabsDocsComponent implements OnInit {
    static schema: Schema = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    items: {
                        type: 'object',
                        properties: {
                            label: {
                                type: 'string'
                            },
                            label2: {
                                type: 'string'
                            },
                            label3: {
                                type: 'string'
                            }
                        }
                    },
                    panels: {
                        type: 'object',
                        properties: {
                            content: {
                                type: 'string'
                            },
                            content2: {
                                type: 'string'
                            },
                            content3: {
                                type: 'string'
                            }
                        }
                    }
                }
            },
            state: {
                type: 'object',
                properties: {
                    disabled: {
                        type: 'boolean'
                    },
                    disabled2: {
                        type: 'boolean'
                    },
                    disabled3: {
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
            items: {
                label: 'Link',
                label2: 'Selected',
                label3: 'Disabled'
            },
            panels: {
                content: 'Content Link',
                content2: 'Content Selected',
                content3: 'Content Disabled'
            }
        },
        state: {
            disabled3: 'true'
        }
    };

    tabHtml = tabSrc;

    complexH = complexTabH;

    addingH = tabAddH;
    addingT = tabAddT;

    selectTabByIdHtml = tabSelectionSrc;

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('tabs');
    }

    onSchemaValues(data) {
        this.data = data;
    }
    ngOnInit() {}
}
