import { Component, OnInit, AfterViewInit, ViewChild, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import * as alertExampleHtml from '!raw-loader!./examples/alert-example.component.html';
import * as alertExampleTs from '!raw-loader!./examples/alert-example.component.ts';
import * as alertContent from '!raw-loader!./examples/alert-content.component.ts';
import * as alertComponentAsContentExample from '!raw-loader!./examples/alert-component-as-content-example.component.ts';
import * as alertComponentAsContentExampleH from '!raw-loader!./examples/alert-component-as-content-example.component.html';
import * as alertInlineExampleHtml from '!raw-loader!./examples/alert-inline-example.component.html';
import * as alertInlineExampleTs from '!raw-loader!./examples/alert-inline-example.component.ts';
import * as alertWidthExampleHtml from '!raw-loader!./examples/alert-width-example.component.html';
import * as alertWidthExampleTs from '!raw-loader!./examples/alert-width-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { ActivatedRoute } from '@angular/router';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';

@Component({
    selector: 'app-alert',
    templateUrl: './alert-docs.component.html'
})
export class AlertDocsComponent implements OnInit {
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
            component: 'AlertExampleComponent',
            fileName: 'alert-example',
            code: alertExampleHtml,
            secondFile: 'alert-example',
            typescriptFileCode: alertExampleTs
        },

    ];

    alertComponentContentExample: ExampleFile[] = [
        {
            language: 'html',
            component: 'AlertComponentAsContentExampleComponent',
            fileName: 'alert-component-as-conent',
            code: alertComponentAsContentExampleH
        },
        {
            language: 'typescript',
            fileName: 'alert-component-as-conent',
            code: alertComponentAsContentExample
        },
        {
            language: 'typescript',
            code: alertContent,
            name: 'Alert Content',
            secondFile: 'alert-content'
        }
    ];

    alertInlineExample: ExampleFile[] = [
        {
            language: 'html',
            component: 'AlertInlineExampleComponent',
            fileName: 'alert-inline-example',
            code: alertInlineExampleHtml,
            secondFile: 'alert-inline-example',
            typescriptFileCode: alertInlineExampleTs
        }
    ];

    alertWidthExample: ExampleFile[] = [
        {
            language: 'html',
            component: 'AlertWidthExampleComponent',
            code: alertWidthExampleHtml,
            fileName: 'alert-width-example',
            secondFile: 'alert-width-example',
            typescriptFileCode: alertWidthExampleTs
        }
    ];

    schema: Schema;

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('alert');
    }

    ngOnInit() { }
    onSchemaValues(data) {
        this.data = data;
    }
}
