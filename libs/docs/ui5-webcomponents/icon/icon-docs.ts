import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { IconBasicExample } from './examples/basic-sample';
import { IconBusinessSuiteExample } from './examples/business-suite-icons';
import { IconCustomizationExample } from './examples/customization';
import { IconDesignsExample } from './examples/designs';
import { IconInteractiveExample } from './examples/interactive';
import { IconTntExample } from './examples/tnt-icons';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const designsHtml = 'designs.html';
const designsTs = 'designs.ts';
const interactiveHtml = 'interactive.html';
const interactiveTs = 'interactive.ts';
const customizationHtml = 'customization.html';
const customizationTs = 'customization.ts';
const tntHtml = 'tnt-icons.html';
const tntTs = 'tnt-icons.ts';
const businessSuiteHtml = 'business-suite-icons.html';
const businessSuiteTs = 'business-suite-icons.ts';

@Component({
    selector: 'ui5-icon-docs',
    templateUrl: './icon-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        IconBasicExample,
        IconDesignsExample,
        IconInteractiveExample,
        IconCustomizationExample,
        IconTntExample,
        IconBusinessSuiteExample
    ]
})
export class IconDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'icon-basic-example'
        },
        {
            language: 'typescript',
            component: 'IconBasicExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'icon-basic-example'
        }
    ]);

    private readonly designsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(designsHtml),
            originalFileName: 'icon-designs-example'
        },
        {
            language: 'typescript',
            component: 'IconDesignsExample',
            code: getAssetFromModuleAssets(designsTs),
            originalFileName: 'icon-designs-example'
        }
    ]);

    private readonly interactiveExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(interactiveHtml),
            originalFileName: 'icon-interactive-example'
        },
        {
            language: 'typescript',
            component: 'IconInteractiveExample',
            code: getAssetFromModuleAssets(interactiveTs),
            originalFileName: 'icon-interactive-example'
        }
    ]);

    private readonly customizationExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(customizationHtml),
            originalFileName: 'icon-customization-example'
        },
        {
            language: 'typescript',
            component: 'IconCustomizationExample',
            code: getAssetFromModuleAssets(customizationTs),
            originalFileName: 'icon-customization-example'
        }
    ]);

    private readonly tntExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(tntHtml),
            originalFileName: 'icon-tnt-example'
        },
        {
            language: 'typescript',
            component: 'IconTntExample',
            code: getAssetFromModuleAssets(tntTs),
            originalFileName: 'icon-tnt-example'
        }
    ]);

    private readonly businessSuiteExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(businessSuiteHtml),
            originalFileName: 'icon-business-suite-example'
        },
        {
            language: 'typescript',
            component: 'IconBusinessSuiteExample',
            code: getAssetFromModuleAssets(businessSuiteTs),
            originalFileName: 'icon-business-suite-example'
        }
    ]);

    // Computed properties for template binding (Angular 20 feature)
    readonly basicExamples = computed(() => this.basicExampleFiles());
    readonly designsExamples = computed(() => this.designsExampleFiles());
    readonly interactiveExamples = computed(() => this.interactiveExampleFiles());
    readonly customizationExamples = computed(() => this.customizationExampleFiles());
    readonly businessSuiteExamples = computed(() => this.businessSuiteExampleFiles());
    readonly tntExamples = computed(() => this.tntExampleFiles());
}
