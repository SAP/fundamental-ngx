import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import * as buttonScss from '!raw-loader!./examples/button-examples.component.scss';
import * as buttonOptionsExample from '!raw-loader!./examples/button-options-example.component.html';
import * as buttonIconsExample from '!raw-loader!./examples/button-icons-example.component.html';
import * as buttonSizesExample from '!raw-loader!./examples/button-sizes-example.component.html';
import * as buttonStateExample from '!raw-loader!./examples/button-state-example.component.html';
import * as buttonTypesExample from '!raw-loader!./examples/button-types-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import * as buttonExampleTsCode from '!raw-loader!./examples/button-examples.component.ts';
import { ActivatedRoute } from '@angular/router';
import { Icons } from '../../../documentation/utilities/icons';

@Component({
    selector: 'app-button',
    templateUrl: './button-docs.component.html'
})
export class ButtonDocsComponent implements OnInit {
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
                        enum: ['', 'standard', 'positive', 'medium', 'negative']
                    },
                    options: {
                        type: 'string',
                        enum: ['', 'emphasized', 'light']
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
            option: 'default',
            size: 'default',
            icon: ''
        }
    };

    buttonHtmlOptions: ExampleFile[] = [
        {
            language: 'html',
            code: buttonOptionsExample,
            fileName: 'button-options-example',
            secondFile: 'button-examples',
            component: 'ButtonOptionsExampleComponent',
            typescriptFileCode: buttonExampleTsCode,
            scssFileCode: buttonScss
        }
    ];

    buttonHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: buttonTypesExample,
            fileName: 'button-types-example',
            secondFile: 'button-examples',
            component: 'ButtonTypesExampleComponent',
            typescriptFileCode: buttonExampleTsCode,
            scssFileCode: buttonScss
        }
    ];

    buttonHtmlSize: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSizesExample,
            fileName: 'button-sizes-example',
            secondFile: 'button-examples',
            component: 'ButtonSizesExampleComponent',
            typescriptFileCode: buttonExampleTsCode,
            scssFileCode: buttonScss
        }
    ];

    buttonHtmlIcon: ExampleFile[] = [
        {
            language: 'html',
            code: buttonIconsExample,
            fileName: 'button-icons-example',
            secondFile: 'button-examples',
            component: 'ButtonIconsExampleComponent',
            typescriptFileCode: buttonExampleTsCode,
            scssFileCode: buttonScss
        }
    ];

    buttonHtmlState: ExampleFile[] = [
        {
            language: 'html',
            code: buttonStateExample,
            fileName: 'button-state-example',
            secondFile: 'button-examples',
            component: 'ButtonStateExampleComponent',
            typescriptFileCode: buttonExampleTsCode,
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
