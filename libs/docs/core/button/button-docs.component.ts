import { Component } from '@angular/core';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const buttonScss = 'button-examples.component.scss';
const buttonOptionsExample = 'button-menu-example.component.html';
const buttonIconsExample = 'button-icons-example.component.html';
const buttonSizesExample = 'button-sizes-example.component.html';
const buttonStateExample = 'button-state-example.component.html';
const buttonTypesExample = 'button-types-example.component.html';
const buttonToggledExample = 'button-toggled-example.component.html';

@Component({
    selector: 'app-button',
    templateUrl: './button-docs.component.html'
})
export class ButtonDocsComponent {
    schema: Schema;

    data: any = {
        properties: {
            label: 'click here',
            fdType: 'default',
            fdMenu: false,
            size: 'default',
            compact: false,
            icon: ''
        }
    };

    buttonHtmlOptions: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonOptionsExample),
            fileName: 'button-menu-example',
            scssFileCode: getAssetFromModuleAssets(buttonScss)
        }
    ];

    buttonHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonTypesExample),
            fileName: 'button-types-example',
            scssFileCode: getAssetFromModuleAssets(buttonScss)
        }
    ];

    buttonHtmlSize: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonSizesExample),
            fileName: 'button-sizes-example',
            scssFileCode: getAssetFromModuleAssets(buttonScss)
        }
    ];

    buttonHtmlIcon: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonIconsExample),
            fileName: 'button-icons-example',
            scssFileCode: getAssetFromModuleAssets(buttonScss)
        }
    ];

    buttonHtmlState: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonStateExample),
            fileName: 'button-state-example',
            scssFileCode: getAssetFromModuleAssets(buttonScss)
        }
    ];

    buttonHtmlToggled: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonToggledExample),
            fileName: 'button-toggled-example',
            scssFileCode: getAssetFromModuleAssets(buttonScss)
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('button');
    }

    onSchemaValues(data): void {
        this.data = data;
    }
}
