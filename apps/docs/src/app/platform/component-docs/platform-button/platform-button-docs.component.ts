import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as buttonOptionsExample from '!raw-loader!./platform-button-examples/platform-button-options-example.component.html';
import * as buttonIconsExample from '!raw-loader!./platform-button-examples/platform-button-icons-example.component.html';
import * as buttonSizesExample from '!raw-loader!./platform-button-examples/platform-button-sizes-example.component.html';
import * as buttonStateExample from '!raw-loader!./platform-button-examples/platform-button-state-example.component.html';
import * as buttonTypesExample from '!raw-loader!./platform-button-examples/platform-button-types-example.component.html';
import * as buttonTruncateExample from '!raw-loader!./platform-button-examples/platform-button-truncate-example.component.html';
import * as buttonTsCode from '!raw-loader!./platform-button-examples/platform-button-examples.component.ts';
import * as buttonScss from '!raw-loader!./platform-button-examples/platform-button-examples.scss';


import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';
import { Icons } from '../../../documentation/utilities/icons';

@Component({
    selector: 'app-button',
    templateUrl: './platform-button-docs.component.html'
})
export class PlatformButtonDocsComponent implements OnInit {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    label: {
                        type: 'string'
                    },
                    type: {
                        type: 'string',
                        enum: ['', 'standard', 'positive', 'medium', 'negative']
                    },
                    options: {
                        type: 'string',
                        enum: ['', 'emphasized', 'light']
                    },
                    compact: {
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
            type: 'default',
            option: 'default',
            width: '100px',
            size: 'default',
            icon: ''

        }
    };

    buttonHtmlOptions: ExampleFile[] = [
        {
            language: 'html',
            code: buttonOptionsExample,
            fileName: 'platform-button-options-example',
            secondFile: 'platform-button-examples',
            typescriptFileCode: buttonTsCode,
            component: 'PlatformButtonOptionsExampleComponent',
            scssFileCode: buttonScss
        }
    ];

    buttonHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: buttonTypesExample,
            fileName: 'platform-button-types-example',
            secondFile: 'platform-button-examples',
            typescriptFileCode: buttonTsCode,
            component: 'PlatformButtonTypesExampleComponent',
            scssFileCode: buttonScss
        }
    ];

    buttonHtmlSize: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSizesExample,
            fileName: 'platform-button-sizes-example',
            secondFile: 'platform-button-examples',
            typescriptFileCode: buttonTsCode,
            component: 'PlatformButtonTypesExampleComponent',
            scssFileCode: buttonScss
        }
    ];

    buttonHtmlIcon: ExampleFile[] = [
        {
            language: 'html',
            code: buttonIconsExample,
            fileName: 'platform-button-icons-example',
            secondFile: 'platform-button-examples',
            typescriptFileCode: buttonTsCode,
            component: 'PlatformButtonTypesExampleComponent',
            scssFileCode: buttonScss
        }
    ];

    buttonHtmlState: ExampleFile[] = [
        {
            language: 'html',
            code: buttonStateExample,
            fileName: 'platform-button-state-example',
            secondFile: 'platform-button-examples',
            typescriptFileCode: buttonTsCode,
            component: 'PlatformButtonTypesExampleComponent',
            scssFileCode: buttonScss
        }
    ];

    buttonHtmlTruncate: ExampleFile[] = [
        {
            language: 'html',
            code: buttonTruncateExample,
            fileName: 'platform-button-truncate-example',
            secondFile: 'platform-button-examples',
            typescriptFileCode: buttonTsCode,
            component: 'PlatformButtonTypesExampleComponent',
            scssFileCode: buttonScss
        }
    ];
    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('button');
    }

    ngOnInit() { }
    onSchemaValues(data) {
        this.data = data;
    }
}
