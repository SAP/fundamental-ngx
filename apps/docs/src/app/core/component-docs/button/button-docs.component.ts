import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import buttonScss from '!./examples/button-examples.component.scss?raw';
import buttonOptionsExample from '!./examples/button-menu-example.component.html?raw';
import buttonIconsExample from '!./examples/button-icons-example.component.html?raw';
import buttonSizesExample from '!./examples/button-sizes-example.component.html?raw';
import buttonStateExample from '!./examples/button-state-example.component.html?raw';
import buttonTypesExample from '!./examples/button-types-example.component.html?raw';
import buttonToggledExample from '!./examples/button-toggled-example.component.html?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { Icons } from '../../../documentation/utilities/icons';

@Component({
    selector: 'app-button',
    templateUrl: './button-docs.component.html'
})
export class ButtonDocsComponent {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    label: {
                        type: 'string'
                    },
                    fdType: {
                        type: 'string',
                        enum: [
                            '',
                            'standard',
                            'positive',
                            'negative',
                            'attention',
                            'half',
                            'ghost',
                            'transparent',
                            'emphasized',
                            'menu'
                        ]
                    },
                    fdMenu: {
                        type: 'boolean'
                    },
                    compact: {
                        type: 'boolean'
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
            fdType: 'default',
            fdMenu: false,
            size: 'default',
            compact: false,
            icon: ''
        }
    };

    buttonHtmlOptions: ExampleFile[] = [
        {
            language: 'html',
            code: buttonOptionsExample,
            fileName: 'button-menu-example',
            scssFileCode: buttonScss
        }
    ];

    buttonHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: buttonTypesExample,
            fileName: 'button-types-example',
            scssFileCode: buttonScss
        }
    ];

    buttonHtmlSize: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSizesExample,
            fileName: 'button-sizes-example',
            scssFileCode: buttonScss
        }
    ];

    buttonHtmlIcon: ExampleFile[] = [
        {
            language: 'html',
            code: buttonIconsExample,
            fileName: 'button-icons-example',
            scssFileCode: buttonScss
        }
    ];

    buttonHtmlState: ExampleFile[] = [
        {
            language: 'html',
            code: buttonStateExample,
            fileName: 'button-state-example',
            scssFileCode: buttonScss
        }
    ];

    buttonHtmlToggled: ExampleFile[] = [
        {
            language: 'html',
            code: buttonToggledExample,
            fileName: 'button-toggled-example',
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
