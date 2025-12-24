import { Component, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { AllFeaturesSample } from './examples/all-features-sample';
import { BasicSample } from './examples/basic-sample';
import { EmbeddedBackNavigationSample } from './examples/embedded-back-navigation-sample';
import { EventsSample } from './examples/events-sample';
import { TrialSample } from './examples/trial-sample';
import { WithSearchSample } from './examples/with-search-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const allFeaturesSampleTs = 'all-features-sample.ts';
const allFeaturesSampleHtml = 'all-features-sample.html';
const withSearchSampleTs = 'with-search-sample.ts';
const withSearchSampleHtml = 'with-search-sample.html';
const embeddedBackNavigationSampleTs = 'embedded-back-navigation-sample.ts';
const embeddedBackNavigationSampleHtml = 'embedded-back-navigation-sample.html';
const trialSampleTs = 'trial-sample.ts';
const trialSampleHtml = 'trial-sample.html';
const eventsSampleTs = 'events-sample.ts';
const eventsSampleHtml = 'events-sample.html';

@Component({
    selector: 'ui5-doc-shellbar',
    templateUrl: './shellbar-docs.html',
    standalone: true,
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        BasicSample,
        AllFeaturesSample,
        WithSearchSample,
        EmbeddedBackNavigationSample,
        TrialSample,
        EventsSample
    ]
})
export class ShellBarDocs {
    basicExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample',
            component: 'BasicSample',
            typescriptFileCode: getAssetFromModuleAssets(basicSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample',
            component: 'BasicSample'
        }
    ]);

    allFeaturesExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(allFeaturesSampleTs),
            originalFileName: 'all-features-sample',
            component: 'AllFeaturesSample',
            typescriptFileCode: getAssetFromModuleAssets(allFeaturesSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(allFeaturesSampleHtml),
            originalFileName: 'all-features-sample',
            component: 'AllFeaturesSample'
        }
    ]);

    withSearchExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(withSearchSampleTs),
            originalFileName: 'with-search-sample',
            component: 'WithSearchSample',
            typescriptFileCode: getAssetFromModuleAssets(withSearchSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(withSearchSampleHtml),
            originalFileName: 'with-search-sample',
            component: 'WithSearchSample'
        }
    ]);

    withEmbeddedBackNavigationExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(embeddedBackNavigationSampleTs),
            originalFileName: 'embedded-back-navigation-sample',
            component: 'EmbeddedBackNavigationSample',
            typescriptFileCode: getAssetFromModuleAssets(embeddedBackNavigationSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(embeddedBackNavigationSampleHtml),
            originalFileName: 'embedded-back-navigation-sample',
            component: 'EmbeddedBackNavigationSample'
        }
    ]);

    trialExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(trialSampleTs),
            originalFileName: 'trial-sample',
            component: 'TrialSample',
            typescriptFileCode: getAssetFromModuleAssets(trialSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(trialSampleHtml),
            originalFileName: 'trial-sample',
            component: 'TrialSample'
        }
    ]);

    eventsExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(eventsSampleTs),
            originalFileName: 'events-sample',
            component: 'EventsSample',
            typescriptFileCode: getAssetFromModuleAssets(eventsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(eventsSampleHtml),
            originalFileName: 'events-sample',
            component: 'EventsSample'
        }
    ]);
}
