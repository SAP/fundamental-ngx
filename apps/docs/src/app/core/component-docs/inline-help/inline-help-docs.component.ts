import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as inlineHelpSrc from '!raw-loader!./examples/inline-help-example.component.html';
import * as inlineHelpTriggerHtml from '!raw-loader!./examples/inline-help-trigger-example.component.html';
import * as inlineHelpScssCode from '!raw-loader!./examples/inline-help-example.component.scss';
import * as inlineHelpStylesHtml from '!raw-loader!./examples/inline-help-styled-example.component.html';
import Popper from 'popper.js';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-inline-help',
    templateUrl: './inline-help-docs.component.html'
})
export class InlineHelpDocsComponent {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    label: {
                        type: 'string'
                    },
                    helpText: {
                        type: 'string'
                    },
                    position: {
                        type: 'string',
                        enum: Array.from(Popper.placements)
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;

    data: any = {
        properties: {
            label: 'Inline Help',
            helpText: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
            position: 'bottom-start'
        }
    };

    inlineHelpBasic: ExampleFile[] = [
        {
            language: 'html',
            code: inlineHelpSrc,
            fileName: 'inline-help-example',
            scssFileCode: inlineHelpScssCode
        }
    ];

    inlineHelpTrigger: ExampleFile[] = [
        {
            language: 'html',
            code: inlineHelpTriggerHtml,
            fileName: 'inline-help-trigger-example'
        }
    ];

    inlineHelpStyles: ExampleFile[] = [
        {
            language: 'html',
            code: inlineHelpStylesHtml,
            fileName: 'inline-help-styled-example'
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('inlineHelp');
    }

    onSchemaValues(data): void {
        this.data = data;
    }
}
