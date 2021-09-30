import { Component, ViewEncapsulation } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as buttonrc from '!raw-loader!./examples/button-example/button-example.component.html';
import * as buttosecondarynrc from '!raw-loader!./examples/button-example/button-secondary-example.component.html';
import * as buttoflatnrc from '!raw-loader!./examples/button-example/button-flat-example.component.html';
import * as buttooutlinenrc from '!raw-loader!./examples/button-example/button-outline-example.component.html';
import * as buttolinknrc from '!raw-loader!./examples/button-example/button-link-example.component.html';
import * as buttonakednrc from '!raw-loader!./examples/button-example/button-naked-example.component.html';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { Icons } from '../../../documentation/utilities/icons';

@Component({
    selector: 'app-button',
    templateUrl: './button-docs.component.html',
    styleUrls: ['button-docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ButtonDocsComponent {
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

    buttonExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonrc,
            fileName: 'button-example'
        }
    ];

    buttonSecondaryExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonrc,
            fileName: 'button-secondary-example'
        }
    ];

    buttonFlatExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonrc,
            fileName: 'button-flat-example'
        }
    ];

    buttonLinkExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonrc,
            fileName: 'button-link-example'
        }
    ];

    buttonOutlineExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonrc,
            fileName: 'button-outline-example'
        }
    ];

    buttonNakedExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonrc,
            fileName: 'button-naked-example'
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('button');
    }

    onSchemaValues(data): void {
        this.data = data;
    }
}
