import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

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

    tabHtml =
        '<fd-tab-list>\n' +
        '  <fd-tab [title]="\'Link\'">\n' +
        '    Content Link\n' +
        '  </fd-tab>\n' +
        '  <fd-tab [title]="\'Selected\'" [disabled]="false">\n' +
        '    Content Selected\n' +
        '  </fd-tab>\n' +
        '  <fd-tab [title]="\'Link\'" [disabled]="false">\n' +
        '    Content Link Two\n' +
        '  </fd-tab>\n' +
        '  <fd-tab [title]="\'Disabled\'" [disabled]="true">\n' +
        '    Disabled\n' +
        '  </fd-tab>\n' +
        '</fd-tab-list>';

    selectTabByIdHtml =
        '<fd-tab-list #tabList>\n' +
        '  <fd-tab id="tab1" [title]="\'Tab 1\'">\n' +
        '    Tab 1\n' +
        '  </fd-tab>\n' +
        '  <fd-tab id="tab2" [title]="\'Tab 2\'">\n' +
        '    Tab 2\n' +
        '  </fd-tab>\n' +
        '</fd-tab-list>';

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('tabs');
    }

    onSchemaValues(data) {
        this.data = data;
    }
    ngOnInit() {}
}
