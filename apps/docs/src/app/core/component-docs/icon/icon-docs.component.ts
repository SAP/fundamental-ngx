import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as iconSrc from '!raw-loader!./examples/icon-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as iconTsCode from '!raw-loader!./examples/icon-example.component.ts';
import * as iconScssCode from '!raw-loader!./examples/icon-example.component.scss';
import { Icons } from '../../../documentation/utilities/icons';

@Component({
    selector: 'app-icon',
    templateUrl: './icon-docs.component.html'
})
export class IconDocsComponent {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    glyphs: {
                        type: 'string',
                        enum: Icons
                    }
                }
            },
            modifier: {
                type: 'object',
                properties: {
                    block: {
                        type: 'string',
                        enum: ['s', 'default', 'm', 'l', 'xl']
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;

    data: any = {
        properties: {
            glyphs: 'accelerated'
        },
        modifier: {
            block: 'default'
        }
    };

    iconExample: ExampleFile[] = [
        {
            language: 'html',
            code: iconSrc,
            fileName: 'icon-example',
            typescriptFileCode: iconTsCode,
            component: 'IconExampleComponent',
            scssFileCode: iconScssCode
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('icon');
    }

    onSchemaValues(data) {
        this.data = data;
    }
}
