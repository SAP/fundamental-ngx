import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as tabSrc from '!raw-loader!./examples/tabs-example.component.html';
import * as tabSelectionSrc from '!raw-loader!./examples/tab-selection-example.component.html';
import * as tabAddH from '!raw-loader!./examples/adding-tab-example/adding-tab-example.component.html';
import * as tabAddT from '!raw-loader!./examples/adding-tab-example/adding-tab-example.component.ts';
import * as complexTabH from '!raw-loader!./examples/complex-title-example/complex-title-example.component.html';
import * as navigationTab from '!raw-loader!./examples/tabs-navigation-mode-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

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

    tabExample: ExampleFile[] = [
        {
            language: 'html',
            code: tabSrc
        }
    ];

    complexHeader: ExampleFile[] = [
        {
            language: 'html',
            code: complexTabH
        }
    ];

    navigationTab: ExampleFile[] = [
        {
            language: 'html',
            code: navigationTab
        }
    ];

    addingTab: ExampleFile[] = [
        {
            language: 'html',
            code: tabAddH
        },
        {
            language: 'typescript',
            code: tabAddT
        }
    ];

    tabSelection: ExampleFile[] = [
        {
            language: 'html',
            code: tabSelectionSrc
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('tabs');
    }

    ngOnInit() {}
    onSchemaValues(data) {
        this.data = data;
    }
}
