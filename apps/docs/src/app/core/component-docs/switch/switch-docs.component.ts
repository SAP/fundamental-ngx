import { Component } from '@angular/core';
import * as switchSizeExample from '!raw-loader!./examples/switch-sizes-example/switch-sizes-example.component.html';
import * as switchSizeExampleTsCode from '!raw-loader!./examples/switch-sizes-example/switch-sizes-example.component.ts';
import * as switchSizeExampleScssCode from '!raw-loader!./examples/switch-sizes-example/switch-sizes-example.component.scss';
import * as switchDisableExample from '!raw-loader!./examples/disabled-switch-example/disabled-switch-example.component.html';
import * as switchDisableExampleTsCode from '!raw-loader!./examples/disabled-switch-example/disabled-switch-example.component.ts';
import * as switchDisableExampleScssCode from '!raw-loader!./examples/disabled-switch-example/disabled-switch-example.component.scss';
import * as switchBindingExampleHtml from '!raw-loader!./examples/switch-binding-example/switch-binding-example.component.html';
import * as switchBindingExampleTsCode from '!raw-loader!./examples/switch-binding-example/switch-binding-example.component.ts';
import * as switchBindingExampleScssCode from '!raw-loader!./examples/switch-binding-example/switch-binding-example.component.scss';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import * as switchFormExampleHtmlSrc from '!raw-loader!./examples/switch-form-example/switch-forms-example.component.html';
import * as switchFormExampleTsCode from '!raw-loader!./examples/switch-form-example/switch-forms-example.component.ts';
import * as semanticSwitchExampleHtml from '!raw-loader!./examples/semantic-switch-example/semantic-switch-example.component.html';
import * as semanticSwitchExampleTs from '!raw-loader!./examples/semantic-switch-example/semantic-switch-example.component.ts';
import * as switchFormExampleScssCode from '!raw-loader!./examples/switch-form-example/switch-forms-example.component.scss';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-switch',
    templateUrl: './switch-docs.component.html'
})
export class SwitchDocsComponent {
    static schema: any = {
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
                    compact: {
                        type: 'boolean'
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
            compact: true
        }
    };

    switchSize: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'switch-sizes-example',
            code: switchSizeExample,
            typescriptFileCode: switchSizeExampleTsCode,
            component: 'SwitchSizesExampleComponent',
            scssFileCode: switchSizeExampleScssCode
        }
    ];

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

    switchSemantic: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'semantic-switch-example',
            code: semanticSwitchExampleHtml,
            typescriptFileCode: semanticSwitchExampleTs,
            component: 'SemanticSwitchExampleComponent'
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
