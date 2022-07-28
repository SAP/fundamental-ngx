import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AlertComponent } from '@fundamental-ngx/core/alert';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import alertExampleHtml from '!./examples/alert-example.component.html?raw';
import alertExampleScs from '!./examples/alert-example.component.scss?raw';
import alertContent from '!./examples/alert-content.component.ts?raw';
import alertComponentAsContentExample from '!./examples/alert-component-as-content-example.component.ts?raw';
import alertComponentAsContentExampleH from '!./examples/alert-component-as-content-example.component.html?raw';
import alertComponentAsContentExampleScss from '!./examples/alert-component-as-content-example.component.scss?raw';
import alertInlineExampleHtml from '!./examples/alert-inline-example.component.html?raw';
import alertInlineExampleScs from '!./examples/alert-inline-example.component.scss?raw';
import alertInlineExampleTs from '!./examples/alert-inline-example.component.ts?raw';
import alertWidthExampleHtml from '!./examples/alert-width-example.component.html?raw';
import alertWidthExampleTs from '!./examples/alert-width-example.component.ts?raw';
import alertWidthExampleScss from '!./examples/alert-width-example.component.scss?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-alert',
    templateUrl: './alert-docs.component.html'
})
export class AlertDocsComponent implements AfterViewInit {
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
        },
        {
            language: 'typescript',
            component: 'AlertInlineExampleComponent',
            code: alertInlineExampleTs,
            fileName: 'alert-inline-example'
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

    @ViewChild('alert')
    alertComponent: AlertComponent;

    onSchemaValues(data): void {
        this.data = data;
        this.openDynamicAlert();
    }

    /** opens alert */
    openDynamicAlert(): void {
        this.alertComponent.open();
    }

    ngAfterViewInit(): void {
        this.openDynamicAlert();
    }
}
