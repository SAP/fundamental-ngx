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

    tabHtml = `<fd-tab-list>
  <fd-tab [title]="'Link'">
    Content Link
  </fd-tab>
  <fd-tab [title]="'Selected'" [disabled]="false">
    Content Selected
  </fd-tab>
  <fd-tab [title]="'Link'" [disabled]="false">
    Content Link Two
  </fd-tab>
  <fd-tab [title]="'Disabled'" [disabled]="true">
    Disabled
  </fd-tab>
</fd-tab-list>`;

    selectTabByIdHtml = `<fd-tab-list #tabList>
  <fd-tab id="tab1" [title]="'Tab 1'">
    Tab 1
  </fd-tab>
  <fd-tab id="tab2" [title]="'Tab 2'">
    Tab 2
  </fd-tab>
</fd-tab-list>`;

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('tabs');
    }

    onSchemaValues(data) {
        this.data = data;
    }
    ngOnInit() {}
}
