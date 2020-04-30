import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import * as alertExampleHtml from '!raw-loader!./examples/alert-example.component.html';
import * as alertExampleScs from '!raw-loader!./examples/alert-example.component.scss';
import * as alertContent from '!raw-loader!./examples/alert-content.component.ts';
import * as alertComponentAsContentExample from '!raw-loader!./examples/alert-component-as-content-example.component.ts';
import * as alertComponentAsContentExampleH from '!raw-loader!./examples/alert-component-as-content-example.component.html';
import * as alertComponentAsContentExampleScss from '!raw-loader!./examples/alert-component-as-content-example.component.scss';
import * as alertInlineExampleHtml from '!raw-loader!./examples/alert-inline-example.component.html';
import * as alertInlineExampleScs from '!raw-loader!./examples/alert-inline-example.component.scss';
import * as alertWidthExampleHtml from '!raw-loader!./examples/alert-width-example.component.html';
import * as alertWidthExampleTs from '!raw-loader!./examples/alert-width-example.component.ts';
import * as alertWidthExampleScss from '!raw-loader!./examples/alert-width-example.component.scss';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-alert',
    templateUrl: './alert-docs.component.html'
})
export class AlertDocsComponent {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    dismissible: {
                        type: 'boolean'
                    },
                    mousePersist: {
                        type: 'boolean'
                    },
                    width: {
                        type: 'string'
                    },
                    message: {
                        type: 'string'
                    },
                    duration: {
                        type: 'string'
                    }
                }
            },
            modifier: {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                        enum: ['default', 'warning', 'error', 'success', 'information']
                    }
                }
            }
        },
        type: 'object'
    };

    data: any = {
        properties: {
            dismissible: true,
            width: '100%',
            message: 'This is an alert message.',
            duration: 10000,
            mousePersist: true
        },
        modifier: {
            type: 'default'
        }
    };

    alertBasicExample: ExampleFile[] = [
        {
            language: 'html',
            scssFileCode: alertExampleScs,
            fileName: 'alert-example',
            code: alertExampleHtml
        }
    ];

    alertComponentContentExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'alert-component-as-content-example',
            code: alertComponentAsContentExampleH,
            scssFileCode: alertComponentAsContentExampleScss
        },
        {
            language: 'typescript',
            fileName: 'alert-component-as-content-example',
            code: alertComponentAsContentExample,
            component: 'AlertComponentAsContentExampleComponent',
            entryComponent: true,
            name: 'Main Component',
            main: true
        },
        {
            language: 'typescript',
            code: alertContent,
            fileName: 'alert-content',
            component: 'AlertContentComponent',
            name: 'Content Component',
            entryComponent: true
        }
    ];

    alertInlineExample: ExampleFile[] = [
        {
            language: 'html',
            scssFileCode: alertInlineExampleScs,
            fileName: 'alert-inline-example',
            code: alertInlineExampleHtml
        }
    ];

    alertWidthExample: ExampleFile[] = [
        {
            language: 'html',
            code: alertWidthExampleHtml,
            fileName: 'alert-width-example',
            scssFileCode: alertWidthExampleScss
        },
        {
            language: 'typescript',
            component: 'AlertWidthExampleComponent',
            code: alertWidthExampleTs,
            fileName: 'alert-width-example'
        }
    ];

    schema: Schema;

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('alert');
    }

    onSchemaValues(data) {
        this.data = data;
    }
}
