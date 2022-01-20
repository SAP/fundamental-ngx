import { Component, ViewEncapsulation } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import buttonSplitOptionsExampleTs from '!./examples/split-button-options-example.component.ts?raw';
import buttonSplitProgrammaticalyExampleTs from '!./examples/split-button-programmatical-example.component.ts?raw';
import buttonSplitTemplateExampleTs from '!./examples/split-button-template-example.component.ts?raw';
import buttonTypesExampleTs from '!./examples/split-button-types-example.component.ts?raw';
import buttonSplitIconsTs from '!./examples/split-button-icons-example.component.ts?raw';
import buttonSplitBehaviorsHtml from '!./examples/split-button-behaviors-example.component.html?raw';
import buttonSplitBehaviorsTs from '!./examples/split-button-behaviors-example.component.ts?raw';
import buttonTypesExample from '!./examples/split-button-types-example.component.html?raw';
import buttonSplitProgrammaticalyExample from '!./examples/split-button-programmatical-example.component.html?raw';
import buttonSplitOptionsExample from '!./examples/split-button-options-example.component.html?raw';
import buttonSplitIcons from '!./examples/split-button-icons-example.component.html?raw';
import buttonSplitTemplateExample from '!./examples/split-button-template-example.component.html?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-split-button',
    templateUrl: './split-button-docs.component.html',
    styleUrls: ['./split-button-docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SplitButtonDocsComponent {
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

    buttonHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: buttonTypesExample,
            fileName: 'split-button-types-example',
            typescriptFileCode: buttonTypesExampleTs,
            component: 'ButtonSplitTypesExampleComponent'
        }
    ];

    buttonSplitProgrammaticallyExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSplitProgrammaticalyExample,
            fileName: 'split-button-programmatical-example',
            typescriptFileCode: buttonSplitProgrammaticalyExampleTs,
            component: 'ButtonSplitProgrammaticalExampleComponent'
        }
    ];

    buttonSplitTemplateExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSplitTemplateExample,
            fileName: 'split-button-template-example',
            typescriptFileCode: buttonSplitTemplateExampleTs,
            component: 'ButtonSplitTemplateExampleComponent'
        }
    ];

    buttonSplitOptionsExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSplitOptionsExample,
            fileName: 'split-button-options-example',
            typescriptFileCode: buttonSplitOptionsExampleTs,
            component: 'ButtonSplitOptionsExampleComponent'
        }
    ];

    buttonSplitIcons: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSplitIcons,
            fileName: 'split-button-icons-example',
            typescriptFileCode: buttonSplitIconsTs,
            component: 'ButtonSplitTypesIconsComponent'
        }
    ];

    buttonSplitBehaviors: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSplitBehaviorsHtml,
            fileName: 'split-button-behaviors-example',
            component: 'ButtonSplitBehaviorsComponent'
        },
        {
            language: 'typescript',
            component: 'ButtonSplitBehaviorsComponent',
            code: buttonSplitBehaviorsTs,
            fileName: 'split-button-behaviors-example'
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('button');
    }

    onSchemaValues(data): void {
        this.data = data;
    }
}
