import { Component } from '@angular/core';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';

import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    PlayGroundComponent,
    SeparatorComponent,
    getAssetFromModuleAssets,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { ButtonBadgeExampleComponent } from './examples/button-badge-example.component';
import { ButtonIconsExampleComponent } from './examples/button-icons-example.component';
import { ButtonMenuExampleComponent } from './examples/button-menu-example.component';
import { ButtonSizesExampleComponent } from './examples/button-sizes-example.component';
import { ButtonStateExampleComponent } from './examples/button-state-example.component';
import { ButtonToggledExampleComponent } from './examples/button-toggled-example.component';
import { ButtonTypesExampleComponent } from './examples/button-types-example.component';

const buttonOptionsExample = 'button-menu-example.component';
const buttonIconsExample = 'button-icons-example.component';
const buttonSizesExample = 'button-sizes-example.component';
const buttonStateExample = 'button-state-example.component';
const buttonTypesExample = 'button-types-example.component';
const buttonToggledExample = 'button-toggled-example.component';

@Component({
    selector: 'app-button',
    templateUrl: './button-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        ButtonTypesExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        ButtonMenuExampleComponent,
        ButtonSizesExampleComponent,
        ButtonIconsExampleComponent,
        ButtonStateExampleComponent,
        ButtonToggledExampleComponent,
        PlayGroundComponent,
        ButtonComponent,
        ContentDensityDirective,
        MessageStripComponent,
        ButtonBadgeExampleComponent
    ]
})
export class ButtonDocsComponent {
    schema: Schema;

    data: any = {
        properties: {
            toggled: false,
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
            code: getAssetFromModuleAssets(`${buttonOptionsExample}.html`),
            fileName: 'button-menu-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(`${buttonOptionsExample}.ts`),
            fileName: 'button-menu-example',
            component: 'ButtonMenuExampleComponent'
        }
    ];

    buttonHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(`${buttonTypesExample}.html`),
            fileName: 'button-types-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(`${buttonTypesExample}.ts`),
            fileName: 'button-types-example',
            component: 'ButtonTypesExampleComponent'
        }
    ];

    buttonHtmlSize: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(`${buttonSizesExample}.html`),
            fileName: 'button-sizes-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(`${buttonSizesExample}.ts`),
            fileName: 'button-sizes-example',
            component: 'ButtonSizesExampleComponent'
        }
    ];

    buttonHtmlIcon: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(`${buttonIconsExample}.html`),
            fileName: 'button-icons-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(`${buttonIconsExample}.ts`),
            fileName: 'button-icons-example',
            component: 'ButtonIconsExampleComponent'
        }
    ];

    buttonHtmlState: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(`${buttonStateExample}.html`),
            fileName: 'button-state-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(`${buttonStateExample}.ts`),
            fileName: 'button-state-example',
            component: 'ButtonStateExampleComponent'
        }
    ];

    buttonHtmlToggled: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(`${buttonToggledExample}.html`),
            fileName: 'button-toggled-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(`${buttonToggledExample}.ts`),
            fileName: 'button-toggled-example',
            component: 'ButtonToggledExampleComponent'
        }
    ];

    buttonBadgeExample: ExampleFile[] = [
        getExampleFile('button-badge-example.component.ts', {
            component: 'ButtonBadgeExampleComponent'
        })
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('button');
    }

    onSchemaValues(data): void {
        this.data = data;
    }
}
