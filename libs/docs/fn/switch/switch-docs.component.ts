import { Component } from '@angular/core';

const switchDisableExample = 'disabled-switch-example/disabled-switch-example.component.html';
const switchDisableExampleTsCode = 'disabled-switch-example/disabled-switch-example.component.ts';
const switchDisableExampleScssCode = 'disabled-switch-example/disabled-switch-example.component.scss';
const switchBindingExampleHtml = 'switch-binding-example/switch-binding-example.component.html';
const switchBindingExampleTsCode = 'switch-binding-example/switch-binding-example.component.ts';
const switchBindingExampleScssCode = 'switch-binding-example/switch-binding-example.component.scss';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';

const switchFormExampleHtmlSrc = 'switch-form-example/switch-forms-example.component.html';
const switchFormExampleTsCode = 'switch-form-example/switch-forms-example.component.ts';
const switchFormExampleScssCode = 'switch-form-example/switch-forms-example.component.scss';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

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
            code: getAssetFromModuleAssets(switchDisableExample),
            typescriptFileCode: getAssetFromModuleAssets(switchDisableExampleTsCode),
            component: 'DisabledSwitchExampleComponent',
            scssFileCode: getAssetFromModuleAssets(switchDisableExampleScssCode)
        }
    ];

    switchBinding: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'switch-binding-example',
            code: getAssetFromModuleAssets(switchBindingExampleHtml),
            typescriptFileCode: getAssetFromModuleAssets(switchBindingExampleTsCode),
            component: 'SwitchBindingExampleComponent',
            scssFileCode: getAssetFromModuleAssets(switchBindingExampleScssCode)
        }
    ];

    switchFormExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'switch-forms-example',
            code: getAssetFromModuleAssets(switchFormExampleHtmlSrc),
            scssFileCode: getAssetFromModuleAssets(switchFormExampleScssCode)
        },
        {
            language: 'typescript',
            fileName: 'switch-forms-example',
            code: getAssetFromModuleAssets(switchFormExampleTsCode),
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
