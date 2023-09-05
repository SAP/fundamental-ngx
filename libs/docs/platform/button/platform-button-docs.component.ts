import { Component } from '@angular/core';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import {
    PlatformButtonIconsExampleComponent,
    PlatformButtonSizesExampleComponent,
    PlatformButtonStateExampleComponent,
    PlatformButtonTruncateExampleComponent,
    PlatformButtonTypesExampleComponent
} from './examples/platform-button-examples.component';
const buttonIconsExample = 'platform-button-icons-example.component.html';
const buttonSizesExample = 'platform-button-sizes-example.component.html';
const buttonStateExample = 'platform-button-state-example.component.html';
const buttonTypesExample = 'platform-button-types-example.component.html';
const buttonTruncateExample = 'platform-button-truncate-example.component.html';
const buttonScss = 'platform-button-examples.scss';

@Component({
    selector: 'app-button',
    templateUrl: './platform-button-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformButtonTypesExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformButtonSizesExampleComponent,
        PlatformButtonIconsExampleComponent,
        PlatformButtonStateExampleComponent,
        PlatformButtonTruncateExampleComponent
    ]
})
export class PlatformButtonDocsComponent {
    schema: Schema;

    data: any = {
        properties: {
            label: 'click here',
            buttonType: 'default',
            width: '100px',
            size: 'default',
            icon: '',
            contentDensity: 'cozy',
            disabled: false,
            ariaDisabled: false,
            ariaSelected: true
        }
    };

    buttonHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonTypesExample),
            fileName: 'platform-button-types-example',
            scssFileCode: getAssetFromModuleAssets(buttonScss)
        }
    ];

    buttonHtmlSize: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonSizesExample),
            fileName: 'platform-button-sizes-example',
            scssFileCode: getAssetFromModuleAssets(buttonScss)
        }
    ];

    buttonHtmlIcon: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonIconsExample),
            fileName: 'platform-button-icons-example',
            scssFileCode: getAssetFromModuleAssets(buttonScss)
        }
    ];

    buttonHtmlState: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonStateExample),
            fileName: 'platform-button-state-example',
            scssFileCode: getAssetFromModuleAssets(buttonScss)
        }
    ];

    buttonHtmlTruncate: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonTruncateExample),
            fileName: 'platform-button-truncate-example',
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
