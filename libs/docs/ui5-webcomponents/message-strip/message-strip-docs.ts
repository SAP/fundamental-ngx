import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { MessageStripBasicSample } from './examples/basic-sample';
import { MessageStripCustomIconSample } from './examples/custom-icon';
import { MessageStripCustomizationSample } from './examples/customization';
import { MessageStripDesignsSample } from './examples/designs';
import { MessageStripHideIconAndCloseButtonSample } from './examples/hide-icon-and-close-button';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const designsHtml = 'designs.html';
const designsTs = 'designs.ts';
const hideIconAndCloseButtonHtml = 'hide-icon-and-close-button.html';
const hideIconAndCloseButtonTs = 'hide-icon-and-close-button.ts';
const customIconHtml = 'custom-icon.html';
const customIconTs = 'custom-icon.ts';
const customizationHtml = 'customization.html';
const customizationTs = 'customization.ts';

@Component({
    selector: 'ui5-message-strip-docs',
    templateUrl: './message-strip-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        MessageStripBasicSample,
        MessageStripDesignsSample,
        MessageStripHideIconAndCloseButtonSample,
        MessageStripCustomIconSample,
        MessageStripCustomizationSample
    ]
})
export class MessageStripDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            fileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'MessageStripBasicSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: 'basic-sample'
        }
    ]);

    private readonly designsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(designsHtml),
            fileName: 'designs'
        },
        {
            language: 'typescript',
            component: 'MessageStripDesignsSample',
            code: getAssetFromModuleAssets(designsTs),
            fileName: 'designs'
        }
    ]);

    private readonly hideIconAndCloseButtonExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(hideIconAndCloseButtonHtml),
            fileName: 'hide-icon-and-close-button'
        },
        {
            language: 'typescript',
            component: 'MessageStripHideIconAndCloseButtonSample',
            code: getAssetFromModuleAssets(hideIconAndCloseButtonTs),
            fileName: 'hide-icon-and-close-button'
        }
    ]);

    private readonly customIconExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(customIconHtml),
            fileName: 'custom-icon'
        },
        {
            language: 'typescript',
            component: 'MessageStripCustomIconSample',
            code: getAssetFromModuleAssets(customIconTs),
            fileName: 'custom-icon'
        }
    ]);

    private readonly customizationExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(customizationHtml),
            fileName: 'customization'
        },
        {
            language: 'typescript',
            component: 'MessageStripCustomizationSample',
            code: getAssetFromModuleAssets(customizationTs),
            fileName: 'customization'
        }
    ]);

    readonly basicExamples = computed(() => this.basicExampleFiles());
    readonly designsExamples = computed(() => this.designsExampleFiles());
    readonly hideIconAndCloseButtonExamples = computed(() => this.hideIconAndCloseButtonExampleFiles());
    readonly customIconExamples = computed(() => this.customIconExampleFiles());
    readonly customizationExamples = computed(() => this.customizationExampleFiles());
}
