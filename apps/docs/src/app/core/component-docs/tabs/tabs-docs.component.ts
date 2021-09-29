import { Component, ViewEncapsulation } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as tabSrc from '!raw-loader!./examples/tabs-example/tabs-example.component.html';
import * as tabForm from '!raw-loader!./examples/tab-form-element-example/tab-form-element-example.component.html';
import * as tabCounter from '!raw-loader!./examples/tab-counter-example/tab-counter.component.html';
import * as tabProcess from '!raw-loader!./examples/tab-process-example/tab-process-example.component.html';
import * as tabIcon from '!raw-loader!./examples/tab-icon-only-example/tab-icon-only-example.component.html';
import * as tabFilter from '!raw-loader!./examples/tab-filter-example/tab-filter-example.component.html';
import * as tabSelectionSrc from '!raw-loader!./examples/tab-selection-example/tab-selection-example.component.html';
import * as tabSelectionSrcTs from '!raw-loader!./examples/tab-selection-example/tab-selection-example.component.ts';
import * as tabAddH from '!raw-loader!./examples/adding-tab-example/adding-tab-example.component.html';
import * as tabAddT from '!raw-loader!./examples/adding-tab-example/adding-tab-example.component.ts';
import * as tabAddS from '!raw-loader!./examples/adding-tab-example/adding-tab-example.component.scss';
import * as collapsibleOverflowTabT from '!raw-loader!./examples/tab-collapsible-overflow-example/tab-collapsible-overflow-example.component.ts';
import * as collapsibleOverflowTabH from '!raw-loader!./examples/tab-collapsible-overflow-example/tab-collapsible-overflow-example.component.html';
import * as stackedTabT from '!raw-loader!./examples/tab-stacked-content-example/tab-stacked-content-example.component.ts';
import * as stackedTabH from '!raw-loader!./examples/tab-stacked-content-example/tab-stacked-content-example.component.html';
import * as collapsibleTabT from '!raw-loader!./examples/tab-collapsible-example/tab-collapsible-example.component.ts';
import * as collapsibleTabH from '!raw-loader!./examples/tab-collapsible-example/tab-collapsible-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { Icons } from '../../../documentation/utilities/icons';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs-docs.component.html',
    styleUrls: ['tabs-docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TabsDocsComponent {
    static schema: Schema = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    items: {
                        type: 'object',
                        properties: {
                            mode: {
                                type: 'string',
                                enum: ['', 'icon-only', 'filter', 'process']
                            },
                            compact: {
                                type: 'boolean'
                            }
                        }
                    },
                    item1: {
                        type: 'object',
                        properties: {
                            title: {
                                type: 'string'
                            },
                            counter: {
                                type: 'string'
                            },
                            content: {
                                type: 'string'
                            },
                            icon: {
                                type: 'string',
                                enum: Icons
                            }
                        }
                    },
                    item2: {
                        type: 'object',
                        properties: {
                            title2: {
                                type: 'string'
                            },
                            counter2: {
                                type: 'string'
                            },
                            content2: {
                                type: 'string'
                            },
                            icon2: {
                                type: 'string',
                                enum: Icons
                            }
                        }
                    },
                    item3: {
                        type: 'object',
                        properties: {
                            title3: {
                                type: 'string'
                            },
                            counter3: {
                                type: 'string'
                            },
                            content3: {
                                type: 'string'
                            },
                            icon3: {
                                type: 'string',
                                enum: Icons
                            }
                        }
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
                mode: '',
                compact: false
            },
            item1: {
                title: 'Title1',
                counter: '1',
                content: 'Content 1',
                icon: 'menu'
            },
            item2: {
                title2: 'Title2',
                counter2: '2',
                content2: 'Content 2',
                icon2: 'menu'
            },
            item3: {
                title3: 'Title3',
                counter3: '3',
                content3: 'Content 3',
                icon3: 'menu'
            }
        }
    };

    tabExample: ExampleFile[] = [
        {
            language: 'html',
            code: tabSrc,
            fileName: 'tabs-example'
        }
    ];

    tabFormExample: ExampleFile[] = [
        {
            language: 'html',
            code: tabForm,
            fileName: 'tab-form-element-example'
        }
    ]

    tabCounter: ExampleFile[] = [
        {
            language: 'html',
            code: tabCounter,
            fileName: 'tab-counter-example'
        }
    ];

    tabProcess: ExampleFile[] = [
        {
            language: 'html',
            code: tabProcess,
            fileName: 'tab-process-example'
        }
    ];

    tabIcon: ExampleFile[] = [
        {
            language: 'html',
            code: tabIcon,
            fileName: 'tab-icon-example'
        }
    ];

    tabFilter: ExampleFile[] = [
        {
            language: 'html',
            code: tabFilter,
            fileName: 'tab-filter-example'
        }
    ];

    addingTab: ExampleFile[] = [
        {
            language: 'html',
            code: tabAddH,
            fileName: 'adding-tab-example',
            scssFileCode: tabAddS
        },
        {
            language: 'typescript',
            code: tabAddT,
            fileName: 'adding-tab-example',
            component: 'AddingTabExampleComponent'
        }
    ];

    collapsibleOverflowTab: ExampleFile[] = [
        {
            language: 'html',
            code: collapsibleOverflowTabH,
            fileName: 'tab-collapsible-overflow-example',
            scssFileCode: tabAddS
        },
        {
            language: 'typescript',
            code: collapsibleOverflowTabT,
            fileName: 'tab-collapsible-overflow-example',
            component: 'TabCollapsibleOverflowExampleComponent'
        }
    ];

    stackedTab: ExampleFile[] = [
        {
            language: 'html',
            code: stackedTabH,
            fileName: 'tab-stacked-content-example'
        },
        {
            language: 'typescript',
            code: stackedTabT,
            fileName: 'tab-stacked-content-example',
            component: 'TabStackedContentExampleComponent'
        }
    ];

    collapsibleTab: ExampleFile[] = [
        {
            language: 'html',
            code: collapsibleTabH,
            fileName: 'tab-collapsible-example'
        },
        {
            language: 'typescript',
            code: collapsibleTabT,
            fileName: 'tab-collapsible-example',
            component: 'tabCollapsibleExampleComponent'
        }
    ];

    tabSelection: ExampleFile[] = [
        {
            language: 'html',
            code: tabSelectionSrc,
            fileName: 'tab-selection-example',
            typescriptFileCode: tabSelectionSrcTs,
            component: 'TabSelectionExampleComponent'
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('tabs');
    }

    onSchemaValues(data): void {
        this.data = data;
    }
}
