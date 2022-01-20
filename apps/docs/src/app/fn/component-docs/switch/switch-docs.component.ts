import { Component } from '@angular/core';
import switchDisableExample from '!./examples/disabled-switch-example/disabled-switch-example.component.html?raw';
import switchDisableExampleTsCode from '!./examples/disabled-switch-example/disabled-switch-example.component.ts?raw';
import switchDisableExampleScssCode from '!./examples/disabled-switch-example/disabled-switch-example.component.scss?raw';
import switchBindingExampleHtml from '!./examples/switch-binding-example/switch-binding-example.component.html?raw';
import switchBindingExampleTsCode from '!./examples/switch-binding-example/switch-binding-example.component.ts?raw';
import switchBindingExampleScssCode from '!./examples/switch-binding-example/switch-binding-example.component.scss?raw';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import switchFormExampleHtmlSrc from '!./examples/switch-form-example/switch-forms-example.component.html?raw';
import switchFormExampleTsCode from '!./examples/switch-form-example/switch-forms-example.component.ts?raw';
import switchFormExampleScssCode from '!./examples/switch-form-example/switch-forms-example.component.scss?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-switch',
    templateUrl: './switch-docs.component.html'
})
export class SwitchDocsComponent {
    static schema: Schema = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    disabled: {
                        type: 'boolean'
                    },
                    checked: {
                        type: 'boolean'
                    },
                    inactiveText: {
                        type: 'string'
                    },
                    activeText: {
                        type: 'string'
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;

    data: any = {
        properties: {
            disabled: false,
            checked: false,
            inactiveText: 'Off',
            activeText: 'On'
        }
    };

    switchDisable: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'disabled-switch-example',
            code: switchDisableExample,
            typescriptFileCode: switchDisableExampleTsCode,
            component: 'DisabledSwitchExampleComponent',
            scssFileCode: switchDisableExampleScssCode
        }
    ];

    switchBinding: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'switch-binding-example',
            code: switchBindingExampleHtml,
            typescriptFileCode: switchBindingExampleTsCode,
            component: 'SwitchBindingExampleComponent',
            scssFileCode: switchBindingExampleScssCode
        }
    ];

    switchFormExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'switch-forms-example',
            code: switchFormExampleHtmlSrc,
            scssFileCode: switchFormExampleScssCode
        },
        {
            language: 'typescript',
            fileName: 'switch-forms-example',
            code: switchFormExampleTsCode,
            component: 'SwitchFormsExampleComponent'
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('switch');
    }

    onSchemaValues(data): void {
        this.data = data;
    }
}
