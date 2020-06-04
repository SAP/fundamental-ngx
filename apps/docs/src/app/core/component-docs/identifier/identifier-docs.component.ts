import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as identifierScss from '!raw-loader!./examples/identifier-stack.component.scss';
import * as circleSrc from '!raw-loader!./examples/circle-identifier-example.component.html';
import * as colorsSrc from '!raw-loader!./examples/colors-identifier-example.component.html';
import * as iconSrc from '!raw-loader!./examples/icon-identifier-example.component.html';
import * as initialsSrc from '!raw-loader!./examples/initials-identifier-example.component.html';
import * as transparentSrc from '!raw-loader!./examples/transparent-identifier-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { Icons } from '../../../documentation/utilities/icons';

@Component({
    selector: 'app-identifier',
    templateUrl: './identifier-docs.component.html',
    styleUrls: ['./identifier-docs.component.scss']
})
export class IdentifierDocsComponent {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
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
                    initials: {
                        type: 'string'
                    },
                    glyphs: {
                        type: 'string',
                        enum: Icons
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;

    data: any = {
        properties: {
            size: 'm',
            circle: false,
            transparent: false,
            colorAccent: 'default',
            initials: '',
            glyphs: 'money-bills'
        }
    };

    iconHtml: ExampleFile[] = [
        {
            language: 'html',
            code: iconSrc,
            fileName: 'icon-identifier-example',
            scssFileCode: identifierScss
        }
    ];

    initialsHtml: ExampleFile[] = [
        {
            language: 'html',
            code: initialsSrc,
            fileName: 'initials-identifier-example',
            scssFileCode: identifierScss
        }
    ];

    circleHtml: ExampleFile[] = [
        {
            language: 'html',
            code: circleSrc,
            fileName: 'circle-identifier-example',
            scssFileCode: identifierScss
        }
    ];

    transparentHtml: ExampleFile[] = [
        {
            language: 'html',
            code: transparentSrc,
            fileName: 'transparent-identifier-example',
            scssFileCode: identifierScss
        }
    ];

    colorAccentHtml: ExampleFile[] = [
        {
            language: 'html',
            code: colorsSrc,
            fileName: 'colors-identifier-example',
            scssFileCode: identifierScss
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('identifier');
    }

    onSchemaValues(data) {
        this.data = data;
    }
}
