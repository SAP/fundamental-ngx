import { Component, ViewEncapsulation } from '@angular/core';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const buttonSplitOptionsExampleTs = 'split-button-options-example.component.ts';
const buttonSplitProgrammaticalyExampleTs = 'split-button-programmatical-example.component.ts';
const buttonSplitTemplateExampleTs = 'split-button-template-example.component.ts';
const buttonTypesExampleTs = 'split-button-types-example.component.ts';
const buttonSplitIconsTs = 'split-button-icons-example.component.ts';
const buttonSplitBehaviorsHtml = 'split-button-behaviors-example.component.html';
const buttonSplitBehaviorsTs = 'split-button-behaviors-example.component.ts';
const buttonTypesExample = 'split-button-types-example.component.html';
const buttonSplitProgrammaticalyExample = 'split-button-programmatical-example.component.html';
const buttonSplitOptionsExample = 'split-button-options-example.component.html';
const buttonSplitIcons = 'split-button-icons-example.component.html';
const buttonSplitTemplateExample = 'split-button-template-example.component.html';

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
            code: getAssetFromModuleAssets(buttonTypesExample),
            fileName: 'split-button-types-example',
            typescriptFileCode: getAssetFromModuleAssets(buttonTypesExampleTs),
            component: 'ButtonSplitTypesExampleComponent'
        }
    ];

    buttonSplitProgrammaticallyExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonSplitProgrammaticalyExample),
            fileName: 'split-button-programmatical-example',
            typescriptFileCode: getAssetFromModuleAssets(buttonSplitProgrammaticalyExampleTs),
            component: 'ButtonSplitProgrammaticalExampleComponent'
        }
    ];

    buttonSplitTemplateExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonSplitTemplateExample),
            fileName: 'split-button-template-example',
            typescriptFileCode: getAssetFromModuleAssets(buttonSplitTemplateExampleTs),
            component: 'ButtonSplitTemplateExampleComponent'
        }
    ];

    buttonSplitOptionsExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonSplitOptionsExample),
            fileName: 'split-button-options-example',
            typescriptFileCode: getAssetFromModuleAssets(buttonSplitOptionsExampleTs),
            component: 'ButtonSplitOptionsExampleComponent'
        }
    ];

    buttonSplitIcons: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonSplitIcons),
            fileName: 'split-button-icons-example',
            typescriptFileCode: getAssetFromModuleAssets(buttonSplitIconsTs),
            component: 'ButtonSplitTypesIconsComponent'
        }
    ];

    buttonSplitBehaviors: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonSplitBehaviorsHtml),
            fileName: 'split-button-behaviors-example',
            component: 'ButtonSplitBehaviorsComponent'
        },
        {
            language: 'typescript',
            component: 'ButtonSplitBehaviorsComponent',
            code: getAssetFromModuleAssets(buttonSplitBehaviorsTs),
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
