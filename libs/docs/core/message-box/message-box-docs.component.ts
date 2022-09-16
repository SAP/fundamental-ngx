import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const templateBasedTs = 'template-based/template-based-message-box-example.component.ts';
const templateBasedHtml = 'template-based/template-based-message-box-example.component.html';

const componentBasedTs = 'component-based/component-based-message-box-example.component.ts';
const componentBasedExampleTs = 'component-based/message-box-example.component.ts';

const objectBasedTs = 'object-based/object-based-message-box-example.component.ts';
const objectBasedHtml = 'object-based/object-based-message-box-example.component.html';

const semanticTypesTs = 'semantic-types/semantic-types-example.component.ts';
const semanticTypesHtml = 'semantic-types/semantic-types-example.component.html';

const customPositionHtml = 'custom-position/message-box-position-example.component.html';
const customPositionTs = 'custom-position/message-box-position-example.component.ts';

const mobileModeHtml = 'mobile-mode/message-box-mobile-example.component.html';
const mobileModeTs = 'mobile-mode/message-box-mobile-example.component.ts';

const complexTemplateTs = 'complex-template/complex-template-example.component.ts';
const complexTemplateExampleTs = 'complex-template/message-box-complex-example.component.ts';

@Component({
    selector: 'app-message-box-docs',
    templateUrl: './message-box-docs.component.html'
})
export class MessageBoxDocsComponent {
    objectBased: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(objectBasedHtml),
            fileName: 'object-based-message-box-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(objectBasedTs),
            fileName: 'object-based-message-box-example',
            component: 'ObjectBasedMessageBoxExampleComponent'
        }
    ];

    templateBased: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(templateBasedHtml),
            fileName: 'template-based-message-box-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(templateBasedTs),
            fileName: 'template-based-message-box-example',
            component: 'TemplateBasedMessageBoxExampleComponent'
        }
    ];

    componentBased: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(componentBasedExampleTs),
            name: 'Message box content',
            fileName: 'message-box-example',
            component: 'MessageBoxExampleComponent',
            entryComponent: true
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(componentBasedTs),
            entryComponent: true,
            main: true,
            fileName: 'component-based-message-box-example',
            component: 'ComponentBasedMessageBoxExampleComponent'
        }
    ];

    semanticTypes: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(semanticTypesHtml),
            fileName: 'semantic-types-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(semanticTypesTs),
            fileName: 'semantic-types-example',
            component: 'SemanticTypesExampleComponent'
        }
    ];

    mobileMode: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(mobileModeHtml),
            fileName: 'message-box-mobile-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(mobileModeTs),
            fileName: 'message-box-mobile-example',
            component: 'MessageBoxMobileExampleComponent'
        }
    ];

    customPosition: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(customPositionHtml),
            fileName: 'message-box-position-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(customPositionTs),
            fileName: 'message-box-position-example',
            component: 'MessageBoxPositionExampleComponent'
        }
    ];

    complexTemplate: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(complexTemplateTs),
            name: 'Message box complex',
            fileName: 'complex-template-example',
            component: 'ComplexTemplateExampleComponent',
            main: true,
            entryComponent: true
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(complexTemplateExampleTs),
            entryComponent: true,
            fileName: 'message-box-complex-example',
            component: 'MessageBoxComplexExampleComponent'
        }
    ];
}
