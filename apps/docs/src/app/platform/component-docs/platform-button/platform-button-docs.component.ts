import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import * as buttonIconsExample from '!raw-loader!./platform-button-examples/platform-button-icons-example.component.html';
import * as buttonSizesExample from '!raw-loader!./platform-button-examples/platform-button-sizes-example.component.html';
import * as buttonStateExample from '!raw-loader!./platform-button-examples/platform-button-state-example.component.html';
import * as buttonTypesExample from '!raw-loader!./platform-button-examples/platform-button-types-example.component.html';
import * as buttonTruncateExample from '!raw-loader!./platform-button-examples/platform-button-truncate-example.component.html';
import * as buttonScss from '!raw-loader!./platform-button-examples/platform-button-examples.scss';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { Icons } from '../../../documentation/utilities/icons';

@Component({
    selector: 'app-button',
    templateUrl: './platform-button-docs.component.html'
})
export class PlatformButtonDocsComponent {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    label: {
                        type: 'string'
                    },
                    buttonType: {
                        type: 'string',
                        enum: ['', 'standard', 'positive', 'transparent', 'negative', 'emphasized', 'ghost']
                    },
                    contentDensity: {
                        type: 'string',
                        enum: ['cozy', 'compact']
                    },
                    disabled: {
                        type: 'boolean'
                    },
                    ariaDisabled: {
                        type: 'boolean'
                    },
                    ariaSelected: {
                        type: 'boolean'
                    },
                    width: {
                        type: 'string'
                    },
                    icon: {
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
            label: 'click here',
            buttonType: 'default',
            width: '100px',
            size: 'default',
            icon: '',
            contentDensity: 'cozy',
            disabled: false,
            ariaDisabled: false,
            ariaSelected: true
        }
    };

    buttonHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: buttonTypesExample,
            fileName: 'platform-button-types-example',
            scssFileCode: buttonScss
        }
    ];

    buttonHtmlSize: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSizesExample,
            fileName: 'platform-button-sizes-example',
            scssFileCode: buttonScss
        }
    ];

    buttonHtmlIcon: ExampleFile[] = [
        {
            language: 'html',
            code: buttonIconsExample,
            fileName: 'platform-button-icons-example',
            scssFileCode: buttonScss
        }
    ];

    buttonHtmlState: ExampleFile[] = [
        {
            language: 'html',
            code: buttonStateExample,
            fileName: 'platform-button-state-example',
            scssFileCode: buttonScss
        }
    ];

    buttonHtmlTruncate: ExampleFile[] = [
        {
            language: 'html',
            code: buttonTruncateExample,
            fileName: 'platform-button-truncate-example',
            scssFileCode: buttonScss
        }
    ];
    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('button');
    }

    onSchemaValues(data): void {
        this.data = data;
    }
}
