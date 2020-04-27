import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as tileActionsSrc from '!raw-loader!./examples/tile-actions-example.component.html';
import * as tileButtonSrc from '!raw-loader!./examples/tile-button-example.component.html';
import * as tileDisabledSrc from '!raw-loader!./examples/tile-disabled-example.component.html';
import * as tileSrc from '!raw-loader!./examples/tile-example.component.html';
import * as tileMediaSrc from '!raw-loader!./examples/tile-media-example.component.html';
import * as tileProductSrc from '!raw-loader!./examples/tile-product-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { Icons } from '../../../documentation/utilities/icons';

@Component({
    selector: 'app-tile',
    templateUrl: './tile-docs.component.html'
})
export class TileDocsComponent {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                        enum: ['simple', 'media', 'product']
                    },
                    hasActions: {
                        type: 'boolean'
                    },
                    title: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    },
                    size: {
                        type: 'string',
                        enum: ['s', 'm', 'l']
                    },
                    circle: {
                        type: 'boolean'
                    },
                    transparent: {
                        type: 'boolean'
                    },
                    colorAccent: {
                        type: 'string',
                        enum: ['default', '1', '2', '3', '4', '5', '6', '7', '8', '9']
                    },
                    glyphs: {
                        type: 'string',
                        enum: Icons
                    },
                    imageUrl: {
                        type: 'string'
                    },
                    isButton: {
                        type: 'boolean'
                    },
                    disabled: {
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
            type: 'simple',
            hasActions: false,
            title: 'Tile Title',
            descending: '',
            size: 'm',
            circle: false,
            transparent: true,
            colorAccent: 'default',
            initials: '',
            glyphs: 'home',
            imageUrl: '',
            isButton: false,
            disabled: false
        }
    };

    simpleTile: ExampleFile[] = [
        {
            language: 'html',
            code: tileSrc,
            fileName: 'tile-example'
        }
    ];

    mediaTile: ExampleFile[] = [
        {
            language: 'html',
            code: tileMediaSrc,
            fileName: 'tile-media-example'
        }
    ];

    actionsTile: ExampleFile[] = [
        {
            language: 'html',
            code: tileActionsSrc,
            fileName: 'tile-action-example'
        }
    ];

    buttonTile: ExampleFile[] = [
        {
            language: 'html',
            code: tileButtonSrc,
            fileName: 'tile-button-example'
        }
    ];

    productTile: ExampleFile[] = [
        {
            language: 'html',
            code: tileProductSrc,
            fileName: 'tile-product-example'
        }
    ];

    disabledTile: ExampleFile[] = [
        {
            language: 'html',
            code: tileDisabledSrc,
            fileName: 'tile-disabled-example'
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('tile');
    }

    onSchemaValues(data) {
        this.data = data;
    }
}
