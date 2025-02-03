import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { PlatformFormGeneratorModule } from '@fundamental-ngx/platform/form';
import { PlatformMessagePopoverModule } from '@fundamental-ngx/platform/message-popover';
import { MessagePopoverCustomConfigExampleComponent } from './examples/custom-config/message-popover-custom-config-example.component';
import { MessagePopoverDefaultExampleComponent } from './examples/default/message-popover-default-example.component';
import { FormContainerExampleComponent } from './examples/form-container/form-container-example.component';
import { FormGeneratorComponentExample } from './examples/form-generator/form-generator-component-example.component';

const defaultMessagePopoverHtml = 'default/message-popover-default-example.component.html';
const defaultMessagePopoverTs = 'default/message-popover-default-example.component.ts';
const formContainerExampleHtml = 'form-container/form-container-example.component.html';
const formContainerExampleTs = 'form-container/form-container-example.component.ts';
const formGeneratorExampleHtml = 'form-generator/form-generator-component-example.component.html';
const formGeneratorExampleTs = 'form-generator/form-generator-component-example.component.ts';
const customConfigExampleHtml = 'custom-config/message-popover-custom-config-example.component.html';
const customConfigExampleTs = 'custom-config/message-popover-custom-config-example.component.ts';
const customConfigExampleModule = 'custom-config/example-module.ts';

@Component({
    selector: 'app-message-popover',
    templateUrl: './message-popover-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        MessagePopoverDefaultExampleComponent,
        CodeExampleComponent,
        PlatformFormGeneratorModule,
        SeparatorComponent,
        RouterLink,
        PlatformMessagePopoverModule,
        FormContainerExampleComponent,
        MessagePopoverCustomConfigExampleComponent,
        FormGeneratorComponentExample
    ]
})
export class MessagePopoverDocsComponent {
    messagePopoverDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(defaultMessagePopoverHtml),
            fileName: 'message-popover-default-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(defaultMessagePopoverTs),
            fileName: 'message-popover-default-example',
            component: 'MessagePopoverDefaultExampleComponent'
        }
    ];

    messagePopoverContainerExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(formContainerExampleHtml),
            fileName: 'form-container-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(formContainerExampleTs),
            fileName: 'form-container-example',
            component: 'FormContainerExampleComponent'
        }
    ];

    messagePopoverGeneratorExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(formGeneratorExampleHtml),
            fileName: 'form-generator-component-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(formGeneratorExampleTs),
            fileName: 'form-generator-component-example',
            component: 'FormGeneratorComponentExample'
        }
    ];

    messagePopoverConfigExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(customConfigExampleHtml),
            fileName: 'message-popover-custom-config-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(customConfigExampleTs),
            fileName: 'message-popover-custom-config-example',
            component: 'MessagePopoverCustomConfigExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(customConfigExampleModule),
            fileName: 'example-module',
            component: 'MessagePopoverCustomConfigExampleModule'
        }
    ];
}
