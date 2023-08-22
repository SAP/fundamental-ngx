import { Component } from '@angular/core';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';
const buttonIconsExample = 'platform-button-icons-example.component.html';
const buttonSizesExample = 'platform-button-sizes-example.component.html';
const buttonStateExample = 'platform-button-state-example.component.html';
const buttonTypesExample = 'platform-button-types-example.component.html';
const buttonTruncateExample = 'platform-button-truncate-example.component.html';
const buttonScss = 'platform-button-examples.scss';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import {
    PlatformButtonTypesExampleComponent,
    PlatformButtonSizesExampleComponent,
    PlatformButtonIconsExampleComponent,
    PlatformButtonStateExampleComponent,
    PlatformButtonTruncateExampleComponent
} from './examples/platform-button-examples.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

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
