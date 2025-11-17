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
            fileName: 'icon-basic-example'
        },
        {
            language: 'typescript',
            component: 'IconBasicExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: 'icon-basic-example'
        }
    ]);

    private readonly designsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(designsHtml),
            fileName: 'icon-designs-example'
        },
        {
            language: 'typescript',
            component: 'IconDesignsExample',
            code: getAssetFromModuleAssets(designsTs),
            fileName: 'icon-designs-example'
        }
    ]);

    private readonly interactiveExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(interactiveHtml),
            fileName: 'icon-interactive-example'
        },
        {
            language: 'typescript',
            component: 'IconInteractiveExample',
            code: getAssetFromModuleAssets(interactiveTs),
            fileName: 'icon-interactive-example'
        }
    ]);

    private readonly customizationExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(customizationHtml),
            fileName: 'icon-customization-example'
        },
        {
            language: 'typescript',
            component: 'IconCustomizationExample',
            code: getAssetFromModuleAssets(customizationTs),
            fileName: 'icon-customization-example'
        }
    ]);

    private readonly tntExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(tntHtml),
            fileName: 'icon-tnt-example'
        },
        {
            language: 'typescript',
            component: 'IconTntExample',
            code: getAssetFromModuleAssets(tntTs),
            fileName: 'icon-tnt-example'
        }
    ]);

    private readonly businessSuiteExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(businessSuiteHtml),
            fileName: 'icon-business-suite-example'
        },
        {
            language: 'typescript',
            component: 'IconBusinessSuiteExample',
            code: getAssetFromModuleAssets(businessSuiteTs),
            fileName: 'icon-business-suite-example'
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
