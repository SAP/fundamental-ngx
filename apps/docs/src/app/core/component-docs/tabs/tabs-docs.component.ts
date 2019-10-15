import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as tabSrc from '!raw-loader!./examples/tabs-example.component.html';
import * as tabsTsCode from '!raw-loader!./examples/tabs-examples-component.ts';
import * as tabSelectionSrc from '!raw-loader!./examples/tab-selection-example.component.html';
import * as tabSelectionScss from '!raw-loader!./examples/tab-selection-example.component.scss';
import * as tabAddH from '!raw-loader!./examples/adding-tab-example/adding-tab-example.component.html';
import * as tabAddT from '!raw-loader!./examples/adding-tab-example/adding-tab-example.component.ts';
import * as tabAddS from '!raw-loader!./examples/adding-tab-example/adding-tab-example.component.scss';
import * as complexTabH from '!raw-loader!./examples/complex-title-example/complex-title-example.component.html';
import * as complexTabHTsCode from '!raw-loader!./examples/complex-title-example/complex-title-example.component.ts';
import * as navigationTab from '!raw-loader!./examples/tabs-navigation-mode-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import * as navigationTabTsCode from '!raw-loader!./examples/tab-navigation-mode-example-component.ts';
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
            component: 'TabsExampleComponent',
            code: tabSrc,
            fileName: 'tabs-example',
            secondFile: 'tabs-examples',
            typescriptFileCode: tabsTsCode,
        }
    ];

    complexHeader: ExampleFile[] = [
        {
            language: 'html',
            component: 'ComplexTitleExampleComponent',
            code: complexTabH,
            fileName: 'complex-title-example',
            secondFile: 'complex-title-example',
            typescriptFileCode: complexTabHTsCode
        }
    ];

    navigationTab: ExampleFile[] = [
        {
            language: 'html',
            component: 'TabsNavigationModeExampleComponent',
            code: navigationTab,
            fileName: 'tabs-navigation-mode-example',
            secondFile: 'tabs-navigation-mode-example',
            typescriptFileCode: navigationTabTsCode
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
            component: 'AddingTabExampleComponent',
        }
    ];

    tabSelection: ExampleFile[] = [
        {
            language: 'html',
            code: tabSelectionSrc,
            fileName: 'tab-selection-example',
            secondFile: 'tabs-examples',
            typescriptFileCode: tabsTsCode,
            component: 'TabSelectionExampleComponent',
            scssFileCode: tabSelectionScss
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('tabs');
    }

    ngOnInit() { }
    onSchemaValues(data) {
        this.data = data;
    }
}
